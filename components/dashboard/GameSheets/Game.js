import React from 'react';
import { IconClock, IconCalendarEvent, IconMapPin } from '@tabler/icons-react';
import TeamNameAndImage from '@/components/schedule/TeamNameAndImage';

export default function Game() {
	return (
		<>
			<div className='w-full bg-blue-500 p-8 grid grid-cols-4'>
                <div className='col-span-1'>Hi</div>
                <div className='col-span-2'>Hi</div>
                <div className='col-span-1 flex flex-col gap-3'>
                    <div className='flex justify-between gap-3 text-sm'>
                        <span className='flex items-center gap-1'><IconCalendarEvent /> April 2nd, 2023</span>
                        <span className='flex items-center gap-1'><IconClock /> 02:30 PM</span>
                    </div>
                    <div className='flex gap-1 text-sm'><IconMapPin /> Algonquin Dome Field #1</div>
                </div>
            </div>
		</>
	);
}
