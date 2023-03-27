import React, {useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Button } from 'flowbite-react';
import { IconChevronLeft } from '@tabler/icons-react';
import Image from 'next/image';
import TeamMembers from '@/components/team-profile/TeamMembers';
import { getAllPlayers, getAllTeams } from '@/utils/graphql.services';

export default function TeamProfile() {
	const router = useRouter();
	const teamId = router.query.id;
	const [team, setTeam] = useState([]);
	const [captain, setCaptain] = useState("");
	const [player, setPlayer] = useState([]);
	const [member, setMember] = useState([]);

	useEffect(() => {
		if(!teamId) {
			return
		}

		fetchTeams();
		fetchPlayer();
	}, [teamId]);

	const fetchTeams = async () => {
		const data = await getAllTeams();

		const reqTeam = data.filter(function(data){
			return data.id == teamId;
		})
		setTeam(reqTeam);
	};

	const fetchPlayer = async () => {
		const data = await getAllPlayers();
		setPlayer(data);

		//Get captain name
		if (team[0] !== undefined) {
			
			const reqId =  team[0].team_history[0].captains[0]
			
			const reqData = data.filter(function (el) {
				return el.id == reqId;
			})
			console.log(reqData[0].user);
			setCaptain(reqData[0].user);
		}
		else {
			setCaptain("N/A");
		}
	}

	const members = [
		{
			name: "John",
			lastName: "Doe"
		},
		{
			name: "Jane",
			lastName: "Doe"
		},
		{
			name: "Emma",
			lastName: "Smith"
		}
	]

	return (
		<main className="w-full h-screen flex flex-col gap-6 p-8">
			{/* Results */}
			<div className="flex flex-col w-full h-auto bg-white border border-brand-neutral-300 rounded-md">
				<div className="flex justify-between py-3 px-5 border-b border-brand-neutral-300">
					<h1 className="text-lg self-center font-medium">Team Name</h1>
					<Button
						pill={true}
						className="py-0.5 px-3 bg-blue-900 hover:bg-blue-800"
						onClick={() => router.back()}
					>
						<IconChevronLeft className="mr-2 h-5 w-5" />
						Back to Teams
					</Button>
				</div>

				<div className="grid grid-cols-3 gap-4 p-8">
					{/* Team Image */}
					<div className="col-span-3 sm:col-span-1 row-span-2 flex flex-col gap-4">
						<img
							src={'http://via.placeholder.com/200x200'}
							className="rounded-full self-center"
							width="200"
							height="200"
							alt="Team profile image."
						></img>
						<div className="flex justify-center gap-1">
							<Image src="/images/medal.png" width="26" height="26" alt="Medal" />
							<Image src="/images/medal.png" width="26" height="26" alt="Medal" />
							<Image src="/images/medal.png" width="26" height="26" alt="Medal" />
						</div>
					</div>

					{/* Player Information */}
					<div className="col-span-3 sm:col-span-2 grid grid-cols-2 gap-y-4 gap-x-8">
						<div className="col-span-1 flex flex-col">
							<h3 className="mb-1 font-light">Team Name</h3>
							<div className="py-2 px-3 border rounded-md border-brand-blue-900/25 font-medium">
								{team[0] ? team[0].name : " "}
							</div>
						</div>

						<div className="col-span-1 flex flex-col">
							<h3 className="mb-1 font-light">Team Captain</h3>
							<div className="py-2 px-3 border rounded-md border-brand-blue-900/25 font-medium">
								{team[0] ? captain : " "}
							</div>
						</div>

						<div className="col-span-1 flex flex-col">
							<h3 className="mb-1 font-light">Sport</h3>
							<div className="py-2 px-3 border rounded-md border-brand-blue-900/25 font-medium">
								Soccer
							</div>
						</div>

						<div className="col-span-1 flex flex-col">
							<h3 className="mb-1 font-light">Members</h3>
							<div className="py-2 px-3 border rounded-md border-brand-blue-900/25 font-medium">
								{team[0] ? team[0].team_history[0].roster.length : " "}
							</div>
						</div>

						<div className="col-span-1 flex flex-col">
							<h3 className="mb-1 font-light">Home Colours</h3>
							<div className="flex flex-wrap gap-4 py-2 px-3 border rounded-md border-brand-blue-900/25 font-medium">
								<div className={team[0] ? `bg-${team[0].home_colour.toLocaleLowerCase()}-700 w-[15px] h-[15px] mt-1 `: ''}></div>
								<div>
									{team[0] ? team[0].home_colour : " "}
								</div>
							</div>
						</div>

						<div className="col-span-1 flex flex-col">
							<h3 className="mb-1 font-light">Away Colours</h3>
							<div className="flex flex-wrap gap-4 py-2 px-3 border rounded-md border-brand-blue-900/25 font-medium">
								<div className={team[0] ? `bg-${team[0].away_colour.toLocaleLowerCase()}-700 w-[15px] h-[15px] mt-1`: ''}></div>
								<div>
									{team[0] ? team[0].away_colour : " "}
								</div>
							</div>
						</div>

						{/* Player Teams */}
						<div className="col-span-2">
							<h2 className="mb-1 font-light">Members</h2>
							<TeamMembers members={members} />
						</div>
					</div>
				</div>
			</div>
		</main>
	);
}
