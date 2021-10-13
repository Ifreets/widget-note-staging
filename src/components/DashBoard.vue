<template>
    <div class="container">

        <!-- Tabs -->
        <div class="tabs">
            <div class="btn"
                v-for="(item, index) in tabs"
                :key="index"
                :class="{'label-orange': item.name === tab_selected}"
                @click="tab_selected = item.name, get_note_list()"
            >
                {{item.name}}
            </div>
        </div>

        <!-- Create tabs -->
        <div v-show="tab_selected === tabs[0].name">

            <!-- Label -->
            <div class="labels">
                <div v-for="(item, index) in lables" 
                    :key="index" 
                    class="label-primary label-gray"
                    :class="{'label-black': item.name === label_selected}"
                    @click="label_selected = item.name"
                >
                    <span class="text-vertical-center">{{item.name}}</span>
                </div>
            </div>

            <!-- Input -->
            <div class="input-content">

                <div class="input-flex">
                    <div
                        id="content"
                        contenteditable="plaintext-only" 
                        placeholder="Nhập nội dung ghi chú ..." 
                        class="chat-input-text"
                        @input="onInput"
                    >
                    </div>
                </div>

            </div>

            <!-- Fast Time Select  -->
            <div class="time-select">

                <div class="title">
                    Chọn nhanh
                </div>

                <!-- <div class="alert-before">
                    Báo trước: <span class="text-orange">15 phút</span>
                    <img src="./../assets/right_arrow.svg" alt="">
                </div> -->

            </div>

            <!-- Time label -->
            <div class="time-labels">
                <div v-for="(item, index) in time_tabs" 
                    :key="index" 
                    class="label-primary"
                    :class="{'label-orange': item.value === time_selected}"
                    @click="time_selected = item.value"
                >
                    <span class="text-vertical-center">{{item.name}}</span>
                </div>
            </div>

            <!-- Select Calendar -->
            <div class="select-calendar">
                <div>
                    <label>Tần suất</label>
                    <select v-model="frequency_selected">             
                        <option 
                            v-for="(item, index) in frequency" :key="index"
                            :value="item.value"
                        >
                            {{item.name}}
                        </option>
                    </select>
                </div>
                <div>
                    <label>Chọn thời gian nhắc lịch</label>
                    <date-picker 
                        class="date-picker" 
                        v-model="date_picker" 
                        valueType="timestamp"
                        :type="type_date_picker"
                        :shortcuts="shortcuts"
                    >
                    </date-picker>
                </div>
            </div>

            <!-- Button  -->
            <div class="button">

                <div class="btn btn-script label-black" @click="open_modal = true">   
                    Kịch bản
                </div>

                <div class="btn btn-save label-orange"
                    @click="create_new_note()"
                >
                    Lưu
                </div>
            </div>

            <!-- Scrip Modal -->
            <div class="script_modal" v-show="open_modal">
                <div class="header">
                    <div>
                        Chọn kịch bản trả lời khách hàng tự động
                    </div>
                    <img @click="open_modal = false" src="./../assets/close.svg" alt="">
                </div>

                <!-- <div class="script-list">

                    <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. </p>

                    <div class="label-primary label-black">
                        Chọn
                    </div>

                </div>

                <div class="script-list">
                    
                    <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. </p>

                    <div class="label-primary label-orange">
                        Đã chọn
                    </div>

                </div> -->

                <div class="script-empty">
                    Chưa có kịch bản, vui lòng truy cập chức năng "<span class="text-bold">Nhăc hẹn</span>" trên máy tính để tạo kịch bản trả lời khách hàng tự động. <span class="text-orange">(Xem hướng dẫn)</span>
                </div>

            </div>

        </div>

        <!-- schedule tabs-->
        <div v-show="tab_selected === tabs[1].name">

            <!-- Label -->
            <div class="labels padding-bottom">
                <div v-for="(item, index) in schedule_labels" 
                    :key="index" 
                    class="label-primary label-gray"
                    :class="{'label-black': item.name === schedule_selected}"
                    @click="schedule_selected = item.name"
                >
                    <span class="text-vertical-center">{{item.name}}</span>
                </div>
            </div>

            <div class="body-schedule-list">
                <div class="schedule-list" 
                    v-for="(item, index) in note_list"
                    :key="index"
                >

                    <div class="time">
                        <span :class="{'time-number': !item.finished && item.schedule_time }">
                            
                            {{item.createdAt | convert_time}} 

                            <span 
                                class="text-red text-bold"
                                v-show="item.finished && !item.watched"
                            >
                                (Chưa xem)
                            </span>

                            <span v-show="item.finished && item.watched">
                                (Đã xem)
                            </span>

                        </span>

                        <span class="text-green text-bold"
                            v-show="item.finished && item.schedule_time"
                        >
                            Đã kết thúc
                        </span>

                        <span class="text-orange text-bold"
                            v-show="!item.finished && item.schedule_time"
                        >
                            {{item.schedule_time | time_more}}
                        </span>

                        <span class="text-black text-bold"
                            v-show="item.is_remove && item.schedule_time"
                        >
                            Xoá lịch
                        </span>
                        
                    </div>

                    <div class="content">
                        <div class="label-primary label-gray">
                            <span>
                                {{item.label}}
                            </span>
                        </div>
                        <div class="schedule-content">
                            <p
                                :class="{ 'line-through': item.finished, 'text-red': !item.watched && item.finished }"
                            >
                                {{item.content}}
                            </p>
                        </div>
                    </div>

                </div>
            </div>

            <div class="edit-note">
                
            </div>

        </div>

    </div>
</template>

<script>
import DatePicker from 'vue2-datepicker';
import 'vue2-datepicker/index.css';
import Resful from '@/services/resful.js'
import dateFormat from 'dateformat'

export default {
    name: "DashBoard",
    components: { DatePicker },
    data() {
        return {
            tabs: [
                {
                    name: 'Tạo mới',
                },
                {
                    name: 'Lịch hẹn đã lên'
                }
            ],
            tab_selected: 'Tạo mới',
            lables : [
                {
                    name: 'Ghi chú'
                },
                {
                    name: 'Nhắc hẹn'
                },
                {
                    name: 'Hỗ trợ'
                },
                {
                    name: 'Họp'
                },
                {
                    name: 'Rời văn phòng'
                },
                {
                    name: 'Email'
                },
            ],
            label_selected: 'Ghi chú',
            input_content: '',
            time_tabs: [
                {
                    name: '30 phút nữa',
                    value: '30_minute'
                },
                {
                    name: '2 tiếng nữa',
                    value: '2_hours'
                },
                {
                    name: '9:00 ngày mai',
                    value: '9:00_tomorrow'
                },
                {
                    name: 'Khác',
                    value: 'other'
                },
            ],
            time_selected: '',
            date_picker: null,
            frequency: [
                {
                    name : 'Không lặp lại',
                    value: 'NONE'
                },
                {
                    name : 'Hàng ngày',
                    value: 'EVERY_DAY'
                },
                {
                    name : 'Hàng Tuần',
                    value: 'EVERY_WEEk'
                },
                {
                    name : 'Hàng tháng',
                    value: 'EVERY_MONTH'
                }
            ],
            frequency_selected: 'NONE',
            shortcuts: [],
            type_date_picker: 'datetime',
            open_modal: false,
            schedule_labels: [
                {
                    name: 'Toàn bộ',
                    value: ''
                },
                {
                    name: 'Ghi chú',
                    value: 'Ghi chú'
                },
                {
                    name: 'Hỗ trợ',
                    value: 'Hỗ trợ'
                },
                {
                    name: 'Họp',
                    value: 'Họp'
                },
                {
                    name: 'Rời văn phòng',
                    value: 'Rời văn phòng'
                },
                {
                    name: 'Email',
                    value: 'Email'
                },
            ],
            schedule_selected: 'Toàn bộ',
            note_list: []
        }
    },
    mounted() {
        this.get_note_list()
        
    },
    watch: {
        frequency_selected: function(val) {
            if(val == 'NONE') {
                this.type_date_picker = 'datetime'
                this.shortcuts = []
            }
            if(val == 'EVERY_DAY') {
                this.type_date_picker = 'time'
                this.shortcuts = []
            }
            if(val == 'EVERY_WEEk') {
                this.type_date_picker = 'week'
                this.shortcuts = []
            }
            if(val == 'EVERY_MONTH') {

                this.type_date_picker = ''

                this.shortcuts = [
                {
                    text: 'Hôm nay',
                    onClick() {
                        const date = new Date();
                        // return a Date
                        return date;
                    },
                },
                {
                    text: 'Ngày mai',
                    onClick() {
                        const date = new Date();
                        date.setTime(date.getTime() + 3600 * 1000 * 24);
                        return date;
                    },
                },
                {
                    text: 'Ngày kia',
                    onClick() {
                        const date = new Date();
                        date.setTime(date.getTime() + 2 * 3600 * 1000 * 24);
                        return date;
                    },
                },
            ]
            }
        },
        time_selected(val) {
            if(val === '30_minute') {
                this.date_picker = Date.now() + (30 * 60 * 1000)
            }
            if(val === '2_hours') {
                this.date_picker = Date.now() + (2 * 60 * 60 * 1000)
            }
            if(val === '9:00_tomorrow') {

                var d = new Date();
                d.setDate(d.getDate() + 1);
                d.setHours(9, 0, 0);
                d.setMilliseconds(0);

                this.date_picker = new Date(d).getTime()
            }
            if(val === 'other') {
                this.date_picker = Date.now()
            }
        }
    },
    methods: {
        onInput(e) {
            if(e && e.target && e.target.innerText) {
                this.input_content = e.target.innerText
            }
        },
        get_note_list() {
            Resful.post(
                '/v1/note/read',
                {},
                (e, r) => {
                    if(e) return console.log(e)
                    this.note_list = r.data.data
                }
            )
        },
        create_new_note() {

            if(!this.input_content) return

            Resful.post(
                '/v1/note/create',
                {
                    "label": this.label_selected,
                    "content": this.input_content,
                    "schedule_time": this.date_picker,
                    "frequency" : this.frequency_selected
                },
                (e, r) => {
                    if(e) return console.log(e)
                    document.getElementById('content').innerHTML = "";
                    this.input_content = ''
                    this.date_picker = null
                    this.time_selected = null

                    this.get_note_list()
                }
            )
        }
    },
    filters: {
        convert_time: function(value) {
            if(!value) return ''
            return dateFormat(new Date(value), 'HH:MM - dd/mm/yyyy')
        },
        time_more : function(value) {

            if (!value) return '' 
            if (value < Date.now()) return ''

            var seconds = Math.floor((value - Date.now()) / 1000);

            var interval = seconds / 31536000;

            if (interval > 1) {
                return Math.floor(interval) + " năm nữa";
            }

            interval = seconds / 2592000;

            if (interval > 1) {
                return Math.floor(interval) + " tháng nữa";
            }

            interval = seconds / 86400;

            if (interval > 1) {
                return Math.floor(interval) + " ngày nữa";
            }

            interval = seconds / 3600;

            if (interval > 1) {
                return Math.floor(interval) + " tiếng nữa";
            }

            interval = seconds / 60;

            if (interval > 1) {
                return Math.floor(interval) + " phút nữa";
            }

            return Math.floor(seconds) + " giây nữa";
        }
    }
    
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.container {
    padding: 8px;

    .tabs {

        width: 100%;
        height: 35px;

        div {
            width: 50%;
            float: left;
            height: 25px;
        }
    }

    .labels {

        width: 100%;
        height: 25px;
        display: flex;
        justify-content: space-between;
        margin-top: 10px

        div {
            height: 15px;
        }
    }

    .padding-bottom {
            padding-bottom: 10px;
    }

    .input-content {

        display: flex;
        justify-content: space-between;
        align-items: flex-start;

        background: #EFF2F5;
        border: 1px solid #DFE1E4;
        box-sizing: border-box;
        border-radius: 5px;
        margin-top: 10px;

        .input-flex {
            flex: 1;
            overflow-y: scroll;
            padding: 5px;

            .chat-input-text:empty::before {
            content: attr(placeholder);
            pointer-events: none;
            display: block;
            color: rgba(0,0,0,.4);
            background-color: transparent;
            font-weight: 300;
            font-size: 14px;
            line-height: 22px;
        }

            .chat-input-text {
                width: 100%;
                min-height: 52px;
                max-height: 53px;
                outline: none;
                font-size: 14px;
            }

        }

    }

    .time-select {
        margin-top: 10px;
        display: flex;
        justify-content: space-between;
        

        .title {
            font-size: 12px;
            color: #4F596A;
        }

        .alert-before {
            font-size: 10px;
            span {
                font-weight: 600;
            }
            
            img {
                margin-bottom: -2px;
                margin-left: 5px;
            }
        }
    }

    .time-labels {
        margin-top: 10px;
        display: flex;
        justify-content: space-between;

        div {
            min-width: 60px;
            min-height: 24px;
        }
    }

    .select-calendar {
        display: flex;
        justify-content: space-between;
        margin-top: 10px;

        div {
            width: 48%;

            label {
                font-size: 12px;
                color: #4F596A;
            }

            select {
                height: 30px;
                border: 1px solid #BCC0C6;
                border-radius: 5px;
                width: 100%;
                margin-top: 10px;

                option {
                    font-size: 12px;
                    color: #4F596A;
                }
            }

            .date-picker {
                height: 30px !important;
                width: 100%;
                margin-top: 10px;
            }
        }
    }

    .button {
        display: flex;
        justify-content: space-between;
        height: 40px;
        margin-top: 15px;

        .btn-script {
            width: 20%;
            font-weight: 500;
        }

        .btn-save {
            width: 75%;
        }
    }

    .script_modal {
        width: 93%;
        height: 250px;
        position: absolute;
        z-index: 1;
        margin: auto;
        background: #FFFFFF;
        border: 1px solid #DFE1E4;
        border-radius: 5px;
        top: 12px;
        padding: 5px;

        .header {
            display: flex;
            justify-content: space-between;
            margin-bottom: 10px;

            div {
                font-size: 12px;
                font-weight: bold;
                color: #848B97;
            }
        }

        .script-list {
            margin: auto;
            width: 316px;
            height: 34px;
            border: 1px solid #DFE1E4;
            border-radius: 4px;
            display: flex;
            align-items: center;
            padding: 0 8px;
            justify-content: space-between;
            margin-bottom: 8px;

            p {
                margin: 0;
                font-size: 12px;
                color: #4F596A; 
                width: 250px;
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
            }

            div {
                height: 18px;
                width: 40px;
            }
        }

        .script-empty {
            width: 260px;
            height: 96px;
            font-size: 12px;
            margin: auto;
            padding: 5px;
            margin-top: 50px;

            .text-bold {
                font-weight: bold;
            }

            .text-orange {
                text-decoration: underline;
            }
        }
        
    }

    .body-schedule-list {

        max-height: 300px;
        overflow: scroll;
        overflow-x: hidden;

        .schedule-list {
        margin-bottom: 10px;
        width: 94%;
        padding: 5px 10px;
        background: #EFF2F5;
        border: 1px solid #F2F2F2;
        border-radius: 5px 10px;


        .time{
            display: flex;
            justify-content: space-between;
            font-size: 10px;

            .time-number {
                font-weight: bold;
            }

        }

        .content {
            display: flex;
            margin-top: 8px;

            .label-primary {
                width: 45px;
                height: 18px;

                span {
                    width: 40px;
                    white-space: nowrap;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    text-align: center;
                }
            }

            .schedule-content {
                font-size: 14px;
                color: #4F596A;
                margin-left: 10px;
                margin-top: 3px;

                p {
                    margin: 0;
                    width: 250px;
                    white-space: nowrap;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    text-align: left;
                }
            }
        }
    }
    }
    

}
</style>
