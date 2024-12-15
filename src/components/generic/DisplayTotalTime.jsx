const DisplayTotalTime = ({ milliseconds }) => {
  return (
    <div
      style={{
        border: '1px solid black',
        height: 50,
        textAlign: 'center',
        marginBottom: 10,
      }}
    >
      
      {new Date(milliseconds).getMinutes() <= 9
        ? '0' + new Date(milliseconds).getMinutes()
        : new Date(milliseconds).getMinutes()}
      :
      {new Date(milliseconds).getSeconds() <= 9
        ? '0' + new Date(milliseconds).getSeconds()
        : new Date(milliseconds).getSeconds()}
      :
      {new Date(milliseconds).getMilliseconds() <= 9
        ? '00' + new Date(milliseconds).getMilliseconds()
        : new Date(milliseconds).getMilliseconds() <= 99
        ? '0' + new Date(milliseconds).getMilliseconds()
        : new Date(milliseconds).getMilliseconds()}
    </div>
  );
};

export default DisplayTotalTime;
