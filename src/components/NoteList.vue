<template>

    <div>
        <!-- Label -->
        <div class="labels padding-bottom">
            <div v-for="(item, index) in schedule_labels" 
                :key="index" 
                class="label-primary label-gray"
                :class="{'label-black': item.value === schedule_selected}"
                @click="schedule_selected = item.value, getNoteList()"
            >
                <span class="text-vertical-center">{{item.name}}</span>
            </div>
        </div>

        <div class="body-schedule-list" v-show="!is_show_edit">

            <div class="schedule-list" 
                v-for="(item, index) in note_list"
                :key="index"
                @click="showEdit(item)"
            >

                <div class="time">
                    <span :class="{'time-number': !item.finished && item.schedule_time }">

                        {{item.createdAt | convert_time}} 

                        <!-- <span 
                            v-for="(item1, index1) in frequency" :key="index1"
                        >
                            <span v-if="item1.value === item.frequency && !item.finished">
                               [ {{item1.name}} ] 
                            </span>
                        </span>                         -->

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
                        v-show="item.is_remove"
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

        <div class="edit-note" v-show="is_show_edit">
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

                <div class="btn btn-update label-orange"
                    @click="updateNote()"
                >
                    Cập nhật
                </div>

                <div class="btn btn-update label-black" @click="removeNote()">   
                    Xoá
                </div>

                
            </div>

        </div>

    </div>

</template>

<script>
import DatePicker from 'vue2-datepicker';
import 'vue2-datepicker/index.css';
import Resful from '@/services/resful.js'

export default {
    name: "DashBoard",
    components: { 
        DatePicker,
    },
    data() {
        return {
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
            schedule_selected: '',
            note_list: [],
            item_edit: {},
            is_show_edit: false
        }
    },
    mounted() {
        this.getNoteList()
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
        getNoteList() {

            let body = {
                label: this.schedule_selected
            }

            if(!body.label) delete body.label

            Resful.post(
                '/v1/note/read',
                body,
                (e, r) => {
                    if(e) return console.log(e)
                    this.note_list = r.data.data
                }
            )
        },
        showEdit(item) {
            this.item_edit = item
            this.is_show_edit = true
            document.getElementById('content').innerHTML = item.content;
            this.input_content = item.content
            this.frequency_selected = item.frequency
            this.date_picker = item.schedule_time
            this.watchNote()
        },
        updateNote() {

            if(!this.input_content) return

            Resful.post(
                '/v1/note/update',
                {
                    "_id" : this.item_edit._id,
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

                    this.is_show_edit = false
                    this.getNoteList()
                }
            )
        },
        removeNote() {

            Resful.post(
                '/v1/note/update',
                {
                    "_id" : this.item_edit._id,
                    "is_remove": true
                },
                (e, r) => {
                    if(e) return console.log(e)
                    document.getElementById('content').innerHTML = "";
                    this.input_content = ''
                    this.date_picker = null
                    this.time_selected = null

                    this.is_show_edit = false
                    this.getNoteList()
                }
            )
        },
        watchNote() {
            Resful.post(
                '/v1/note/update',
                {
                    "_id" : this.item_edit._id,
                    "watched": true
                },
                (e, r) => {
                    if(e) return console.log(e)
                }
            )
        }
    }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

</style>
