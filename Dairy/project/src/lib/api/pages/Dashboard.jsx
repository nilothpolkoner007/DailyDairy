import { Calendar, Plus, Image } from 'lucide-react';
import { format } from 'date-fns';
import { MoodMeter } from '../../../components/MoodMeter';

export function Dashboard() {
  const today = new Date();

  return (
    <div className='h-[calc(100vh-2rem)] p-6 flex gap-6'>
      {/* Left Panel - Todo List */}
      <div className='flex-1 bg-white rounded-xl shadow-sm overflow-hidden'>
        <div className='p-6 border-b border-gray-100'>
          <div className='flex items-center justify-between mb-6'>
            <h2 className='text-2xl font-semibold text-gray-800'>Tasks</h2>
            <button className='flex items-center px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700'>
              <Plus className='w-4 h-4 mr-2' />
              Add Task
            </button>
          </div>

          <div className='flex gap-2'>
            <button className='px-4 py-2 text-sm font-medium text-blue-600 bg-blue-50 rounded-lg hover:bg-blue-100'>
              All
            </button>
            <button className='px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-50 rounded-lg'>
              Today
            </button>
            <button className='px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-50 rounded-lg'>
              Upcoming
            </button>
          </div>
        </div>

        <div className='p-6'>
          {/* Task Categories */}
          <div className='grid grid-cols-3 gap-4 mb-6'>
            <div className='p-4 bg-red-50 rounded-lg'>
              <h3 className='font-medium text-red-700'>Work</h3>
              <p className='text-2xl font-bold text-red-800'>5</p>
            </div>
            <div className='p-4 bg-blue-50 rounded-lg'>
              <h3 className='font-medium text-blue-700'>Personal</h3>
              <p className='text-2xl font-bold text-blue-800'>3</p>
            </div>
            <div className='p-4 bg-green-50 rounded-lg'>
              <h3 className='font-medium text-green-700'>Shopping</h3>
              <p className='text-2xl font-bold text-green-800'>2</p>
            </div>
          </div>

          {/* Task List */}
          <div className='space-y-4'>
            {/* Sample Tasks */}
            <div className='p-4 border border-gray-100 rounded-lg hover:shadow-sm transition-shadow'>
              <div className='flex items-center gap-4'>
                <input type='checkbox' className='w-5 h-5 border-gray-300 rounded text-blue-600' />
                <div className='flex-1'>
                  <h4 className='font-medium text-gray-800'>Complete project presentation</h4>
                  <p className='text-sm text-gray-500'>Due today at 5:00 PM</p>
                </div>
                <span className='px-2 py-1 text-xs font-medium text-red-700 bg-red-50 rounded-full'>
                  High
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Panel - Diary */}
      <div className='flex-1 bg-white rounded-xl shadow-sm overflow-hidden'>
        <div className='p-6 border-b border-gray-100'>
          <div className='flex items-center justify-between mb-6'>
            <h2 className='text-2xl font-semibold text-gray-800'>Daily Journal</h2>
            <button className='flex items-center px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-lg hover:bg-indigo-700'>
              <Plus className='w-4 h-4 mr-2' />
              New Entry
            </button>
          </div>

          <div className='flex items-center gap-4'>
            <Calendar className='w-5 h-5 text-gray-400' />
            <span className='text-gray-600'>{format(today, 'EEEE, MMMM do, yyyy')}</span>
          </div>
        </div>

        <div className='p-6'>
          {/* Mood Meter */}
          <div className='mb-6'>
            <h3 className='text-lg font-medium text-gray-800 mb-4'>Today's Mood</h3>
            <MoodMeter />
          </div>

          {/* Editor Placeholder */}
          <div className='bg-gray-50 rounded-lg p-4 text-gray-500'>Write about your day...</div>

          {/* Photo Upload Section */}
          <div className='mt-6'>
            <h3 className='text-sm font-medium text-gray-700 mb-3'>Today's Photos</h3>
            <div className='border-2 border-dashed border-gray-200 rounded-lg p-8 text-center'>
              <div className='flex flex-col items-center'>
                <Image className='w-12 h-12 text-gray-400 mb-3' />
                <p className='text-sm text-gray-500'>
                  Drag and drop photos here, or click to select
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
