/**
 * Last updated: 2023-03-14
 *
 * Author(s):
 * Ghazaldeep Kaur <kaur0762@algonquinlive.com>
 */

import React, { useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

const HeaderTitle = () => {
	const router = useRouter();

	useEffect(() => {
		console.log('Pathname:', router.pathname);
	}, [router.pathname])

	return (
		<>
		{router.pathname === '/' && (
			<div className="p-1 pt-0 pl-7">
				<div className='flex flex-col gap-3'>
					<div className='flex flex-row'>
						<Link href="/" className="font-light text-[.8rem]">Home</Link>
					</div>
					<p className="font-semibold text-[1.8rem]">Dashboard</p>
				</div>
			</div>
		)}
		{router.pathname === '/sports/soccer' && (
			<div className="p-1 pt-0 pl-7">
				<div className='flex flex-col gap-3'>
					<div className='flex flex-row'>
						<Link href="/" className="font-light text-[.8rem]">Home</Link>
							<p className="font-light text-[.8rem]">&nbsp;/&nbsp;</p>
						<p className="font-light text-[.8rem]">Sports</p>
							<p className="font-light text-[.8rem]">&nbsp;/&nbsp;</p>
						<Link href="/sports/soccer" className="font-light text-[.8rem]">Soccer</Link>
					</div>
					<p className="font-semibold text-[1.8rem]">Soccer ⚽</p>
				</div>
			</div>
		)}
		{router.pathname === '/players' && (
			<div className="p-1 pt-0 pl-7">
				<div className='flex flex-col gap-3'>
					<div className='flex flex-row'>
						<Link href="/" className="font-light text-[.8rem]">Home</Link>
							<p className="font-light text-[.8rem]">&nbsp;/&nbsp;</p>
						<p className="font-light text-[.8rem]">Rosters</p>
							<p className="font-light text-[.8rem]">&nbsp;/&nbsp;</p>
						<Link href="/players" className="font-light text-[.8rem]">Players</Link>
					</div>
					<p className="font-semibold text-[1.8rem]">Players ⛹️‍♂️</p>
				</div>
			</div>
		)}
		{router.pathname === '/teams' && (
			<div className="p-1 pt-0 pl-7">
				<div className='flex flex-col gap-3'>
					<div className='flex flex-row'>
						<Link href="/" className="font-light text-[.8rem]">Home</Link>
							<p className="font-light text-[.8rem]">&nbsp;/&nbsp;</p>
						<p className="font-light text-[.8rem]">Rosters</p>
							<p className="font-light text-[.8rem]">&nbsp;/&nbsp;</p>
						<Link href="/teams" className="font-light text-[.8rem]">Teams</Link>
					</div>
					<p className="font-semibold text-[1.8rem]">Teams 👨‍👦‍👦</p>
				</div>
			</div>
		)}
		{router.pathname === '/settings' && (
			<div className="p-1 pt-0 pl-7">
				<div className='flex flex-col gap-3'>
					<div className='flex flex-row'>
						<Link href="/" className="font-light text-[.8rem]">Home</Link>
							<p className="font-light text-[.8rem]">&nbsp;/&nbsp;</p>
						<Link href="/settings" className="font-light text-[.8rem]">Settings</Link>
					</div>
					<p className="font-semibold text-[1.8rem]">Settings</p>
				</div>
			</div>
		)}
		</>
	);
};

export default HeaderTitle;
