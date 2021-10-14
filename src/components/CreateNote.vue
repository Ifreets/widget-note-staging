<template>
    <!-- Create tabs -->
    <div>
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
                    :format="date_picker_format"
                    :open.sync="open_calendar"
                    :time-picker-options="{
                        start: '00:00',
                        step: '00:30',
                        end: '23:30',
                    }"
                    :show-week-number="show_week_number"
                >
                </date-picker>
            </div>
        </div>

        <!-- Button  -->
        <div class="button">

            <div class="btn btn-script label-black" @click="toogle_modal()">   
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
</template>

<script>
import DatePicker from 'vue2-datepicker';
import 'vue2-datepicker/index.css';
import Resful from '@/services/resful.js'

export default {
    name: "CreateNote",
    components: { DatePicker },
    data() {
        return {
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
            date_picker_format: 'HH:mm DD/MM/YYYY',
            type_date_picker: 'datetime',
            time_picker_option: null,
            open_calendar: false,
            show_week_number: true,
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
       
    },
    watch: {
        frequency_selected: function(val) {
            if(val == 'NONE') {
                this.type_date_picker = 'datetime'
                this.date_picker_format = 'HH:mm DD/MM/YYYY'
            }
            if(val == 'EVERY_DAY') {
                this.type_date_picker = 'time'
                this.date_picker_format = 'HH:mm a'
                this.date_picker = Date.now()
            }
            if(val == 'EVERY_WEEk') {
                this.type_date_picker = 'datetime'
                this.date_picker_format = 'HH:mm dddd'
                this.date_picker = Date.now()
            }
            if(val == 'EVERY_MONTH') {
                this.type_date_picker = 'datetime'
                this.date_picker_format = 'HH:mm DD/MM/YYYY'
                this.date_picker = Date.now()
            }
        },
        time_selected(val) {

            this.frequency_selected = 'NONE'

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
                this.open_calendar = true
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

                    this.$toasted.success("Tạo ghi chú thành công",{
                        duration:5000
                    });
                }
            )
        },
        toogle_modal() {
            if(this.open_modal) return this.open_modal = false
            if(!this.open_modal) return this.open_modal = true
        }
    }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

</style>
