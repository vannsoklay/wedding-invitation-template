import { Profile } from "../types";
// import { Image } from "@nextui-org/react";
interface ProfileCardProps {
  profile: Profile;
  on: number
}

export const ProfileCard: React.FC<ProfileCardProps> = ({ profile, on }) => (
  <div className="text-center transform hover:scale-105 transition-transform duration-300">
    {/* <div className="lg:w-56 lg:h-56 w-36 h-36 rounded-full bg-red-800 border-4 border-red-200 overflow-hidden shadow-lg">
      <Image
        src={profile.image.src}
        alt={profile.image.alt}
        className="w-full h-full object-cover"
      />
    </div> */}
    <div className={`mt-6 text-4xl font-semibold text-red-700 ${on === 0 && 'pr-2'}`}>{profile.name}{on == 0 && <label className={`${on === 0 && 'pl-2'}`}>&</label>}</div>
  </div>
);
