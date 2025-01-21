import ProfileSection from "@/components/home/sections/ProfileSection";
import dynamic from "next/dynamic";

const FreelanceSection = dynamic(
  () => import("@/components/home/sections/FreelanceSection"),
  {
    loading: () => <div className="animate-pulse h-full bg-muted rounded-lg" />,
  }
);

const MainContent = dynamic(
  () => import("@/components/home/sections/MainContent"),
  {
    loading: () => <div className="animate-pulse h-full bg-muted rounded-lg" />,
  }
);

const OptionsSection = dynamic(
  () => import("@/components/home/sections/OptionsSection"),
  {
    loading: () => <div className="animate-pulse h-full bg-muted rounded-lg" />,
  }
);

const Footer = dynamic(() => import("@/components/home/sections/Footer"), {
  loading: () => <div className="animate-pulse h-8 bg-muted" />,
});

export default function Home() {
  return (
    <div className="min-h-screen p-8 flex flex-col justify-center items-center gap-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 my-auto w-full h-full">
        <div className="order-1 sm:col-span-1 sm:order-1 lg:col-span-1 content-center flex flex-col gap-6">
          <ProfileSection />
          <div className="hidden lg:block xl:hidden">
            <FreelanceSection />
          </div>
        </div>
        <div className="order-2 sm:col-span-2 sm:order-3 lg:order-2 lg:col-span-2 content-center">
          <MainContent />
        </div>
        <div className="block lg:hidden xl:block order-4 sm:col-span-1 sm:order-2 lg:order-3 lg:col-span-1 content-center">
          <FreelanceSection />
        </div>
        <div className="order-4 sm:col-span-2 lg:order-4 lg:col-span-4">
          <OptionsSection />
        </div>
      </div>
      <Footer />
    </div>
  );
}
