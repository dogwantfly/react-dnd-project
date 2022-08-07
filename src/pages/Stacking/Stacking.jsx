import '../../index.css';
function Stacking() {
  const toggleList = (e) => {
    console.log(e.target);
    const list = e.target.closest('.company');
    console.log(list);
    list.classList.toggle('bg-[rgba(15,86,86,0.9)]')
  }
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
        <li className="company bg-dark/60 py-5 px-10 rounded-[36px] grid xl:grid-cols-3 xl:justify-between xl:items-center gap-y-4">
          <h2 className="text-4xl">
            抬頭工作室有限公司
          </h2>
          <ul className="grid grid-cols-3 justify-between xl:gap-x-8 overflow-x-auto whitespace-nowrap">
            <li className="font-light sm:text-3xl text-xl">$56 M</li>
            <li className="font-light sm:text-3xl text-xl">159.6%</li>
            <li className="sm:text-3xl text-xl text-fill-transparent font-bold bg-clip-text bg-blue-gradient">$2.569</li>
          </ul>
          <div className="flex gap-4 xl:justify-end flex-wrap">
            <a href="tel:+12345678" className="whitespace-nowrap bg-blue-gradient py-6 px-8 text-3xl inline-block leading-none rounded-3xl hover:opacity-80">
              聯繫公司
            </a>
            <button type="button" className="bg-dark rounded-3xl block material-icons text-7xl hover:opacity-80" onClick={toggleList}>
              arrow_drop_up
            </button>
          </div>
        </li>
      </ul>
    </main>
  );
}

export default Stacking;
