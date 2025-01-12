import { Outlet, Link, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { LayoutDashboard, CheckSquare, Book, Image, User, LogOut } from 'lucide-react';

export function Layout() {
  const { signOut } = useAuth();
  const location = useLocation();

  const navigation = [
    { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
    { name: 'Tasks', href: '/tasks', icon: CheckSquare },
    { name: 'Diary', href: '/diary', icon: Book },
    { name: 'Photos', href: '/photos', icon: Image },
    { name: 'Profile', href: '/profile', icon: User },
  ];

  return (
    <div className='min-h-screen bg-gray-100'>
      <div className='flex h-screen'>
        {/* Sidebar */}
        <div className='w-64 bg-white shadow-lg'>
          <div className='flex flex-col h-full'>
            <div className='flex items-center justify-center h-16 px-4 border-b'>
              <h1 className='text-xl font-bold text-gray-800'>Life Journal</h1>
            </div>
            <nav className='flex-1 px-2 py-4 space-y-1'>
              {navigation.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={`
                      flex items-center px-4 py-2 text-sm rounded-lg
                      ${
                        location.pathname === item.href
                          ? 'bg-blue-50 text-blue-700'
                          : 'text-gray-600 hover:bg-gray-50'
                      }
                    `}
                  >
                    <Icon className='w-5 h-5 mr-3' />
                    {item.name}
                  </Link>
                );
              })}
            </nav>
            <div className='p-4 border-t'>
              <button
                onClick={() => signOut()}
                className='flex items-center w-full px-4 py-2 text-sm text-gray-600 rounded-lg hover:bg-gray-50'
              >
                <LogOut className='w-5 h-5 mr-3' />
                Sign Out
              </button>
            </div>
          </div>
        </div>

        {/* Main content */}
        <div className='flex-1 overflow-auto'>
          <main className='p-6'>
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
}
