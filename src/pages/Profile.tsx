import { useQuery } from "@tanstack/react-query";
import { apiService } from "@/services/api";
import ProfileCard from "@/components/settings/ProfileCard";

const Profile = () => {
  const { data: user, isLoading } = useQuery({
    queryKey: ['user-profile'],
    queryFn: () => apiService.user.getProfile()
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#EFB207]"></div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="container mx-auto py-8">
        <p className="text-center text-gray-600">Não foi possível carregar os dados do usuário.</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 space-y-8">
      <h1 className="text-3xl font-bold text-gray-900">Meu Perfil</h1>
      <div className="max-w-xl mx-auto">
        <ProfileCard user={user} />
      </div>
    </div>
  );
};

export default Profile;