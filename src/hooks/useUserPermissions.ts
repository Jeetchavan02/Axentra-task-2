
const useUserPermissions = () => {
  // Function to get user permissions from localStorage
  const getUserPermissions = () => {
    const storedPermissions = localStorage.getItem('userPermission');
    return storedPermissions ? JSON.parse(storedPermissions) : {}; // Return empty object if not found
  };

  // Function to set user permissions in localStorage
  const setUserPermissions = (permissions: any) => {
    console.log('xxxxxxxxxx user permissions:', permissions);
    localStorage.setItem('userPermission', JSON.stringify(permissions));
  };

  return { getUserPermissions, setUserPermissions };
};

export default useUserPermissions;

