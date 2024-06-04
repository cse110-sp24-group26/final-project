/** Converts js date into date
 * @param date js date object
 * @return date string in yyyy-mm-dd format
 */
export function dateString(date) {
    return date.getFullYear() + "-" + ("00" + (1 + date.getMonth())).slice(-2) + "-" + ("00" + date.getDate()).slice(-2);
}
