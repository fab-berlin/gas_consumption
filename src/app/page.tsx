import ConsumptionWrapper from '@/components/ConsumptionWrapper';

export default function Home() {
  return (
    <div className="">
      <main className="mx-4 mt-8 grid grid-cols-4 md:grid-cols-8 xl:grid-cols-12">
        <div className="col-span-full md:col-span-6 md:col-start-2 xl:col-span-8 xl:col-start-3">
          <ConsumptionWrapper />
        </div>
      </main>
    </div>
  );
}
