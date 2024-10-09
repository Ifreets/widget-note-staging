import { i18n } from "@/lang/i18n"

/** Tần suất nhắc lịch */
export const FREQUENCY = [
  {
    value: 'dont_repeat',
    label: 'NONE',
  },
  {
    value: 'every_day',
    label: 'EVERY_DAY',
  },
  {
    value: 'every_week',
    label: 'EVERY_WEEK',
  },
  {
    value: 'every_month',
    label: 'EVERY_MONTH',
  },
]

/** label các thứ trong toàn */
export const dayInWeek = [
  i18n.global.t('sunday'),
  i18n.global.t('monday'),
  i18n.global.t('tuesday'),
  i18n.global.t('wednesday'),
  i18n.global.t('thursday'),
  i18n.global.t('friday'),
  i18n.global.t('saturday'),
]