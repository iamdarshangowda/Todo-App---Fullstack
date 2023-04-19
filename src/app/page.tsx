import PrimaryButton from "@components/components/common/buttons/primaryButton";
import Tree from "@components/components/tree/tree";

export default function Home() {
  return (
    <main className="flex min-h-screen items-center sm:justify-between p-4 gap-6 flex-col sm:flex-row">
      <div className="w-full sm:h-[95vh] relative h-[15vh] tree rounded-xl">
        <Tree />
        <div className="absolute top-4 left-6 ">
          <h1 className="text-heading-1/h2 text-grey-0">Todo</h1>
        </div>
        <div className="absolute top-16 left-14 ">
          <p className="text-body-2/b2 text-grey-0">by darshan</p>
        </div>
      </div>
      <div className="w-full sm:h-[95vh] h-[75vh] bg-grey-0 rounded-xl flex items-center p-4 justify-center gap-4">
        <div className="max-w-lg flex flex-col gap-4 ">
          <h1 className="text-heading-1/h2 text-grey-90">Productive Mind</h1>
          <p className="text-body-1/b2 text-grey-80">
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Temporibus in
            recusandae, repellendus sapiente dolorem consequatur voluptatibus nulla
            expedita?
          </p>
          <PrimaryButton text={"Get Started"} />
          <p className="text-body-2/b1 text-grey-90 text-center mx-auto hover: cursor-pointer">
            Already have an account? Sign in
          </p>
        </div>
      </div>
    </main>
  );
}
