function PopupUser() {
    const handleUpdateLocation = () => {
        console.log("Update location");
    }
    return (
        <div className="px-2 flex flex-col items-center">
            <h3 className="text-base">Cập nhật vị trí hiện tại?</h3>
            <button onClick={handleUpdateLocation} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 mt-2 rounded">
                Cập nhật
            </button>
        </div>
    );
}

export default PopupUser;