export default function Channels() {
  return (
    <div className="p-5 flex flex-col items-center text-center">
      <div className="border-b border-gray-100 w-full flex items-center flex-col py-3">
        <img src="./avatar.svg" className="w-28 h-1w-28 rounded-full" alt="" />
        <h3 className="text-gray-600 font-semibold text-lg py-2">.Net Devs</h3>
     <div className="w-1/2 flex flex-row justify-between">
     <span className="text-gray-400">   <strong>  310  </strong> Subscribers </span>
        <span className="text-gray-400">   <strong>  13  </strong>Rooms</span>
     </div>
      </div>
    </div>
  );
}
