import { Link } from "react-router-dom";

interface AuthCardProps {
  children: React.ReactNode;
  title?: string;
  isReset?: boolean;
}

const AuthCard = ({ children, title, isReset }: AuthCardProps) => {
  return (
    <div className="w-full">
      <div className="w-full bg-[#f0f5f6] dark:bg-[#18181D] flex flex-col items-center gap-8 px-8 md:px-20 py-14 dark:border rounded dark:border-[#49545A]  ">
        <h2 className="text-3xl font-bold text-black uppercase dark:text-white font-montAlt">
          {title}
        </h2>
        {children}
        {isReset && (
          <Link to={"/reset-password"} className=" text-blue-500 underline">
            {" "}
            Forget Password
          </Link>
        )}
      </div>
    </div>
  );
};

export default AuthCard;
