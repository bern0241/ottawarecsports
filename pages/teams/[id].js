import React, {useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Button } from 'flowbite-react';
import { IconChevronLeft } from '@tabler/icons-react';
import Image from 'next/image';
import TeamMembers from '@/components/team-profile/TeamMembers';
import { getAllPlayers, getTeam, getUser } from '@/utils/graphql.services';
import AWS from 'aws-sdk';

export default function TeamProfile() {
	const router = useRouter();
	const teamId = router.query.id;
	const [team, setTeam] = useState();
	const [captains, setCaptains] = useState([]);
	const [member, setMember] = useState([]);
	var cognitoidentityserviceprovider = new AWS.CognitoIdentityServiceProvider();


	useEffect(() => {
		if(!teamId) {
			return
		}
		fetchTeam();
		fetchPlayer();
	}, [teamId]);

	useEffect(() => {
		if (team) {
			fetchCaptains();
		}
	}, [team])

	useEffect(() => {
		if (captains) {
			console.log('Captains',captains);
		}
	}, [captains])


	const fetchTeam = async () => {
		const data = await getTeam(teamId);
		setTeam(data);
		console.log('TEAM', data);
	};

	const fetchPlayer = async () => {
		const data = await getAllPlayers();
		// setPlayer(data);//

		//Get captain name
		// if (team !== undefined) {
			
		// 	const reqId =  team.team_history.captains
			
		// 	const reqData = data.filter(function (el) {
		// 		return el.id == reqId;
		// 	})
		// 	// console.log(reqData.user);
		// 	// setCaptains(reqData.user);
		// }
		// else {
		// 	setCaptains([]);
		// }
	}

	const fetchCaptains = async () => {
		if (!team) return; //
		setCaptains([]);
		team.team_history[0].captains.forEach(async captain => {
			const params = {
				Username: captain,
				UserPoolId: 'us-east-1_70GCK7G6t'
			}
			cognitoidentityserviceprovider.adminGetUser(params, function(err, data) {
				if (err) console.log(err, err.stack); // an error occurred
				else     {
					// setCaptains(data);
					setCaptains(captains => [...captains, data] );
					return;
				}          // successful response
			});
		})
		// console.log('Captains', captains);
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
								{team && team.name}
							</div>
						</div>

						<div className="col-span-1 flex flex-col">
							<h3 className="mb-1 font-light">Team Captain</h3>
							<div className="py-2 px-3 border rounded-md border-brand-blue-900/25 font-medium">
							{/* {captains.UserAttributes && (
								<p>{captains.UserAttributes.find(o => o.Name === 'name')['Value']} {captains.UserAttributes.find(o => o.Name === 'family_name')['Value']}</p>
							)} */}
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
								{(team && team.team_history) && team.team_history[0].roster.length}
							</div>
						</div>

						<div className="col-span-1 flex flex-col">
							<h3 className="mb-1 font-light">Home Colours</h3>
							<div className="flex flex-wrap gap-4 py-2 px-3 border rounded-md border-brand-blue-900/25 font-medium">
								<div className={team ? `bg-${team.home_colour.toLocaleLowerCase()}-700 w-[15px] h-[15px] mt-1 `: ''}></div>
								<div>
									{team ? team.home_colour : " "}
								</div>
							</div>
						</div>

						<div className="col-span-1 flex flex-col">
							<h3 className="mb-1 font-light">Away Colours</h3>
							<div className="flex flex-wrap gap-4 py-2 px-3 border rounded-md border-brand-blue-900/25 font-medium">
								<div className={team ? `bg-${team.away_colour.toLocaleLowerCase()}-700 w-[15px] h-[15px] mt-1`: ''}></div>
								<div>
									{team ? team.away_colour : " "}
								</div>
							</div>
						</div>

						{/* Player Teams */}
						<div className="col-span-2">
							<h2 className="mb-1 font-light">Members</h2>
							{/* <TeamMembers members={members} /> */}
							{members && members.map((member) => (
								<>
									<p>{member.name}</p>
								</>
							))}
						</div>
					</div>
				</div>
			</div>
		</main>
	);
}
