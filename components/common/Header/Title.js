/**
 * Last updated: 2023-04-05
 *
 * Author(s):
 * Ghazaldeep Kaur <kaur0762@algonquinlive.com>
 */

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { getTeam } from '@/src/graphql/queries';
import { useRouter } from 'next/router';
import { API } from 'aws-amplify';

const HeaderTitle = () => {
	const [team, setTeam] = useState();
	const router = useRouter();
	const {teamId} = router.query;

	useEffect(() => {
		if (teamId) {
			getTeamFunc();
			console.log('TEST!!')
		}
	}, [teamId])

	const getTeamFunc = async () => {
		console.log('CALLED')
		const apiData = await API.graphql({
			query: getTeam,
			variables: { id: teamId },
		});
		const data = await apiData.data.getTeam;
		setTeam(data);
		
	}

	return (
		<>
		{router.pathname === '/' && (
			<div className="p-1 pt-0 pl-2 lg:pl-7">
				<div className='flex flex-col gap-2'>
					<div className='flex flex-row'>
						<Link href="/" className="font-light text-[.8rem]">Home</Link>
					</div>
					<p className="font-semibold text-[1.8rem]">Dashboard</p>
				</div>
			</div>
		)}
		{router.pathname === '/sports/soccer' && (
			<div className="p-1 pt-0 pl-2 lg:pl-7">
				<div className='flex flex-col gap-2'>
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
			<div className="p-1 pt-0 pl-2 lg:pl-7">
				<div className='flex flex-col gap-2'>
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
			<div className="p-1 pt-0 pl-2 lg:pl-7">
				<div className='flex flex-col gap-2'>
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
		{router.pathname === '/admin-portal/users' && (
			<div className="p-1 pt-0 pl-2 lg:pl-7">
				<div className='flex flex-col gap-2'>
					<div className='flex flex-row'>
						<Link href="/" className="font-light text-[.8rem]">Home</Link>
							<p className="font-light text-[.8rem]">&nbsp;/&nbsp;</p>
						<p className="font-light text-[.8rem]">Admin Portal</p>
							<p className="font-light text-[.8rem]">&nbsp;/&nbsp;</p>
						<Link href="/admin-portal/users" className="font-light text-[.8rem]">Users</Link>
					</div>
					<p className="font-semibold text-[1.8rem]">Users</p>
				</div>
			</div>
		)}
		{router.pathname === '/admin-portal/leagues' && (
			<div className="p-1 pt-0 pl-2 lg:pl-7">
				<div className='flex flex-col gap-2'>
					<div className='flex flex-row'>
						<Link href="/" className="font-light text-[.8rem]">Home</Link>
							<p className="font-light text-[.8rem]">&nbsp;/&nbsp;</p>
						<p className="font-light text-[.8rem]">Admin Portal</p>
							<p className="font-light text-[.8rem]">&nbsp;/&nbsp;</p>
						<Link href="/admin-portal/leagues" className="font-light text-[.8rem]">Leagues</Link>
					</div>
					<p className="font-semibold text-[1.8rem]">Leagues</p>
				</div>
			</div>
		)}
		{router.pathname === '/admin-portal/leagues/[divisionID]' && (
			<div className="p-1 pt-0 pl-2 lg:pl-7">
				<div className='flex flex-col gap-2'>
					<div className='flex flex-row'>
						<Link href="/" className="font-light text-[.8rem]">Home</Link>
							<p className="font-light text-[.8rem]">&nbsp;/&nbsp;</p>
						<p className="font-light text-[.8rem]">Admin Portal</p>
							<p className="font-light text-[.8rem]">&nbsp;/&nbsp;</p>
						<Link href="/admin-portal/leagues" className="font-light text-[.8rem]">Leagues</Link>
					</div>
					<p className="font-semibold text-[1.8rem]">Leagues</p>
				</div>
			</div>
		)}
		{router.pathname === '/admin-portal/teams' && (
			<div className="p-1 pt-0 pl-2 lg:pl-7">
				<div className='flex flex-col gap-2'>
					<div className='flex flex-row'>
						<Link href="/" className="font-light text-[.8rem]">Home</Link>
							<p className="font-light text-[.8rem]">&nbsp;/&nbsp;</p>
							<p className="font-light text-[.8rem]">Rosters</p>
							<p className="font-light text-[.8rem]">&nbsp;/&nbsp;</p>
						<Link href="/admin-portal/teams" className="font-light text-[.8rem]">Teams</Link>
					</div>
					<p className="font-semibold text-[1.8rem]">Teams</p>
				</div>
			</div>
		)}
		{router.pathname === '/teams/[teamId]' && (
			<div className="p-1 pt-0 pl-2 lg:pl-7">
				<div className='flex flex-col gap-2'>
					<div className='flex flex-row'>
						<Link href="/" className="font-light text-[.8rem]">Home</Link>
							<p className="font-light text-[.8rem]">&nbsp;/&nbsp;</p>
						<p className="font-light text-[.8rem]">Rosters</p>
							<p className="font-light text-[.8rem]">&nbsp;/&nbsp;</p>
						<Link href="/teams" className="font-light text-[.8rem]">Teams</Link>
						<p className="font-light text-[.8rem]">&nbsp;/&nbsp;</p>
						<Link href={`/teams/${team.id}`} className="font-light text-[.8rem]">{team.name}</Link>
					</div>
					<p className="font-semibold text-[1.8rem]">{team.name}</p>
				</div>
			</div>
		)}
		{router.pathname === '/admin-portal/locations' && (
			<div className="p-1 pt-0 pl-2 lg:pl-7">
				<div className='flex flex-col gap-2'>
					<div className='flex flex-row'>
						<Link href="/" className="font-light text-[.8rem]">Home</Link>
							<p className="font-light text-[.8rem]">&nbsp;/&nbsp;</p>
						<p className="font-light text-[.8rem]">Admin Portal</p>
							<p className="font-light text-[.8rem]">&nbsp;/&nbsp;</p>
						<Link href="/admin-portal/locations" className="font-light text-[.8rem]">Locations</Link>
					</div>
					<p className="font-semibold text-[1.8rem]">Locations</p>
				</div>
			</div>
		)}
		{router.pathname === '/settings' && (
			<div className="p-1 pt-0 pl-2 lg:pl-7">
				<div className='flex flex-col gap-2'>
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
