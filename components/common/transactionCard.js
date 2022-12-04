const TransactionCard = ({
  remarks,
  amount,
  isCredited,
  timeStamp,
  balance,
}) => {
  const timeString = new Date(timeStamp);
  return (
    <div className="rounded bg-white text-slate-900 p-4">
      <div className="flex space-x-4 bg-slate-800 text-yellow-300 text-lg">
        <h3 className="remarks">{remarks}</h3>
        <h4 className="amount">{`${isCredited ? "+" : "-"} ${amount}`}</h4>
      </div>
      <div className="">
        <p className="time-stamp">{timeString.toString()}</p>
        <p className="balance bg-amber-200 ">Balance: {balance} Coin</p>
      </div>
    </div>
  );
};

export default TransactionCard;
