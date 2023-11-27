import AuthCard from "./AuthCard";

interface AuthLayoutProps {
  children: React.ReactNode;
  secondary?: React.ReactNode;
  title?: string;
  isReset?: boolean;
}

const AuthLayout = ({
  children,
  secondary,
  title,
  isReset,
}: AuthLayoutProps) => {
  return (
    <div className="h-screen relative px-6 flex justify-center bg-[#fff] dark:bg-[#101112] md:w-1/2 mx-auto py-12">
      <div className="flex flex-col items-start w-full gap-5 pb-8">
        <AuthCard title={title} isReset={isReset}>
          {children}
        </AuthCard>
        {secondary && <AuthCard>{secondary}</AuthCard>}
      </div>
    </div>
  );
};

export default AuthLayout;
