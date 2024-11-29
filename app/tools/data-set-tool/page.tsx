import DataCollectionWorkshop from '../../../components/DataSetTool';
import NavBar from '../../../components/nav';
export default function Home() {
  return (
    <div className='flex flex-col gap-12'>
      <header>
        <NavBar/>
      </header>
      <main>
        <DataCollectionWorkshop />
      </main>
    </div>
  )
}
