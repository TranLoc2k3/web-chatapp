interface IProps {
    avatar: string;
    fullName: string;
    ID: string;

}
function FriendListItem({ ID,avatar, fullName  }: IProps) {

    return ( 
        <div className="flex space-x-2 border-2 p-2 mt-3 hover:cursor-pointer hover:border-gray-400">
            <img src={avatar} alt="" className="rounded-full w-8 h-8"/>
            <p>{fullName}</p>
        </div>
     );
}

export default FriendListItem;