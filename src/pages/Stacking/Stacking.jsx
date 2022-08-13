import { useState } from 'react';
import '../../index.css';

function Stacking() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <main className="container relative z-[1] text-white">
      <h1 className="font-bold text-3xl mb-4">
        INFORMATIONA
      </h1>
      <div className="hidden text-white/60 text-3xl font-bold px-10 xl:grid grid-cols-3">
        <div>
          company name
        </div>
        <ul className="grid grid-cols-3 text-xl items-center gap-x-8 justify-between">
          <li className="flex">
            liquidity
            <button type="button" className="material-icons block">info</button>
          </li>
          <li className="flex">
            Reward
            <button type="button" className="material-icons block">info</button>
          </li>
          <li>Earned</li>
        </ul>
      </div>
      <ul className="mb-4">
        <li className={`company rounded-[36px] ${isOpen ? 'bg-dark-green-custom' : 'bg-dark/60'}`}>
          <div className="py-5 px-10 grid xl:grid-cols-3 xl:justify-between xl:items-center gap-y-4">
            <h2 className="text-4xl">
              抬頭工作室有限公司
            </h2>
            <ul className="grid grid-cols-3 justify-between xl:gap-x-8 overflow-x-auto whitespace-nowrap">
              <li className="font-light sm:text-3xl text-xl">$56 M</li>
              <li className="font-light sm:text-3xl text-xl">159.6%</li>
              <li className="sm:text-3xl text-xl text-fill-transparent font-bold bg-clip-text bg-blue-gradient">$2.569</li>
            </ul>
            <div className="flex gap-4 xl:justify-end flex-wrap items-center">
              <a href="tel:+12345678" className="whitespace-nowrap bg-blue-gradient md:py-6 py-3 px-8 md:text-3xl text-xl inline-block leading-none rounded-3xl hover:opacity-80">
                聯繫公司
              </a>
              <button type="button" className="bg-dark rounded-3xl block  hover:opacity-80" onClick={() => { setIsOpen(!isOpen) }}>
                <div className={`material-icons transition-all md:text-7xl text-4xl ${isOpen ? 'rotate-180' : ''}`}>arrow_drop_up</div>
              </button>
            </div>
          </div>
          <div className={`form text-white p-0 max-h-0 overflow-hidden transition-all rounded-b-[36px] ${isOpen ? 'max-h-full py-9 px-10' : 'max-h-0 overflow-hidden p-0'}`}>
            <form action="" className="">
              <div className="grid md:grid-cols-2 gap-x-4">
                <div className="relative mb-3">
                  <input type="text" className="border rounded-lg border-white bg-transparent p-2 w-full" id="liquidity" placeholder="..."/>
                  <label htmlFor="liquidity" className="absolute -top-3 left-3 px-1 bg-dark-green-custom">liquidity</label>
                </div>

                <div className="relative mb-3">
                  <input type="text" className="border rounded-lg border-white bg-transparent p-2 w-full" id="earned" placeholder="..."/>
                  <label htmlFor="earned" className="absolute -top-3 left-3 px-1 bg-dark-green-custom">earned</label>
                </div>
              </div>
              <div className="flex justify-end">
                <button className="whitespace-nowrap bg-blue-gradient md:py-6 py-3 px-8 md:text-3xl text-xl inline-block leading-none rounded-3xl hover:opacity-80">
                  儲存
                </button>
              </div>
            </form>
          </div>
        </li>
      </ul>
    </main>
  );
}

export default Stacking;
