// 打字机效果 流式输出
const typeWritter = (bubble, content, callback) => {
    let index = 0;
    const intervalId = setInterval(() => {
      if (index < content.length) {
        bubble.textContent += content.charAt(index++);
      } else {
        clearInterval(intervalId);
        if (typeof callback === 'function') {
          callback();
        }
      }
    }, 500);
  };

  export default typeWritter;