import { MapPin } from 'lucide-react';

function UserMarker() {
    return (
        <div>
            <MapPin className="size-12 bg-cover cursor-pointer" color='red'/>
        </div>
    );
}

export default UserMarker;