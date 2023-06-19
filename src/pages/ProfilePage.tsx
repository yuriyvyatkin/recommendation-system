import { useAppSelector } from '@/app/hooks';
import '@/assets/profile.css';

const ProfilePage = () => {
  const { userInfo } = useAppSelector((state) => state.account);

  let name = 'Unknown user';

  if (userInfo && userInfo.name) {
    name =
      userInfo.name.charAt(0).toUpperCase() +
      userInfo.name.substring(1);
  }

  return (
    <div className="unauthorized">
      <figure>{name}</figure>
      <span>
        Welcome <strong>{name}!</strong> You can view this page because you're logged in
      </span>
    </div>
  );
};

export default ProfilePage;
