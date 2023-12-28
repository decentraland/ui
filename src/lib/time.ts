import Time from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import 'dayjs/locale/zh'
import 'dayjs/locale/es'
import 'dayjs/locale/en'

Time.extend(relativeTime)

export default Time
