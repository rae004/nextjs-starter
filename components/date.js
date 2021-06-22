import { parseISO, format } from "date-fns";

/**
 *
 * @param dateString
 * @param dateFormat options: https://date-fns.org/v2.22.1/docs/format
 * @returns {JSX.Element}
 * @constructor
 */
export default function Date({ dateString, dateFormat }) {
    const date = parseISO(dateString)
    return <time dateTime={dateString}>{ format(date, dateFormat) }</time>
}