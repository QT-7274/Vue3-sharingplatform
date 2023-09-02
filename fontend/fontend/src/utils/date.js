/**
 * 1. 将输入的日期字符串转换为一个日期对象，并赋值给变量date。 
 * 2. 创建一个表示当前时间的日期对象，并赋值给变量now。 
 * 3. 计算当前时间与输入日期之间的时间差，并赋值给变量diff。 
 * 4. 如果时间差小于60秒，则计算出秒数并返回一个表示秒数的字符串。 
 * 5. 如果时间差小于60分钟，则计算出分钟数并返回一个表示分钟数的字符串。 
 * 6. 如果时间差小于24小时，则计算出小时数并返回一个表示小时数的字符串。 
 * 7. 如果以上条件都不满足，则返回一个表示日期的字符串，格式为"年-月-日"。
 */
export function dateToRelative(dateStr) {
    const date = new Date(dateStr);
  
    const now = new Date();
    const diff = now - date;
  
    if (diff < 1000 * 60) {
      const seconds = Math.floor(diff / 1000);
      return `${seconds}秒前`;
    }
  
    if (diff < 1000 * 60 * 60) {
      const minutes = Math.floor(diff / (1000 * 60));
      return `${minutes}分钟前`;
    }
    if (diff < 1000 * 60 * 60 * 24) {
      const hours = Math.floor(diff / (1000 * 60 * 60));
      return `${hours}小时前`;
    }
  
    return `${date.getFullYear()}-${("0" + (date.getMonth() + 1)).slice(
      -2
    )}-${("0" + (date.getDate() + 1)).slice(-2)}`;
  }
  