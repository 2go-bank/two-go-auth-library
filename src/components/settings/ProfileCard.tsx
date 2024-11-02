import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Mail, Phone } from "lucide-react";
import { User } from "@/types/user";

interface ProfileCardProps {
  user: User;
}

const ProfileCard = ({ user }: ProfileCardProps) => {
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .slice(0, 2)
      .map(part => part[0])
      .join('')
      .toUpperCase();
  };

  return (
    <Card className="md:col-span-1">
      <CardHeader className="text-center">
        <div className="flex justify-center mb-4">
          <Avatar className="h-32 w-32 border-2 border-[#EFB207]">
            <AvatarImage src={user?.avatar} alt={user?.name} />
            <AvatarFallback className="bg-[#EFB207] text-2xl text-black">
              {user?.name ? getInitials(user.name) : '??'}
            </AvatarFallback>
          </Avatar>
        </div>
        <CardTitle className="text-xl font-semibold">{user?.name}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center space-x-3 text-gray-600">
          <Mail className="h-5 w-5" />
          <span>{user?.email}</span>
        </div>
        <div className="flex items-center space-x-3 text-gray-600">
          <Phone className="h-5 w-5" />
          <span>{user?.phone_number}</span>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProfileCard;