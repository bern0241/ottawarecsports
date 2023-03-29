/**
 * Last updated: 2023-03-23
 *
 * Author(s):
 * Justin Bernard <bern0241@algonquinlive.com>
 */


function UserCard() {
    
    return (
        <div class="flex items-center px-4 py-2 gap-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
            <Image objectFit='cover' src={userImage !== null ? userImage : 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png'} alt={`Player image`} style={{ width: '3rem', height: '3rem', borderColor: 'black', borderWidth: '0.1px', boxShadow: '2px 2px 5px gray', borderRadius: '50px' }} />
            <p className='text-sm'>{user.Attributes.find(o => o.Name === 'name')['Value']} {user.Attributes.find(o => o.Name === 'family_name')['Value']}</p>
        </div>
    )
}