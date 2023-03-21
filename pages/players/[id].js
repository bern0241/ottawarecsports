/**
 * Last updated: 2023-03-20
 *
 * Author(s):
 * Verity Stevens <stev0298@algonquinlive.com>
 */

import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import { Button } from 'flowbite-react';
import { IconChevronLeft } from '@tabler/icons-react';
import AWS from 'aws-sdk';
import Image from 'next/image';

export default function PlayerProfile({ user }) {
	const router = useRouter();

	useEffect(() => {
		console.log(user);
	}, []);

	return (
		<>
			{/* Content */}
			<main className="w-full h-screen mt-16 flex flex-col gap-6 p-8">
				{/* Results */}
				<div className="flex flex-col w-full h-auto bg-white border border-brand-neutral-300 rounded-md">
					<div className="flex justify-between py-3 px-5 border-b border-brand-neutral-300">
						<h1 className="text-lg self-center font-medium">
							{user.find((o) => o.Name === 'name')['Value']}{' '}
							{user.find((o) => o.Name === 'family_name')['Value']}
						</h1>
						<Button
							pill={true}
							className="py-0.5 px-3 bg-blue-900 hover:bg-blue-800"
							onClick={() => router.back()}
						>
							<IconChevronLeft className="mr-2 h-5 w-5" />
							Back to Players
						</Button>
					</div>

					<div className="grid grid-cols-3 gap-4 p-8">
						{/* Player Avatar */}
						<div className="col-span-3 sm:col-span-1 row-span-2 flex flex-col gap-4">
							<img
								src={'https://api.lorem.space/image/face?w=200&h=200'}
								className="rounded-full self-center"
								width="200"
								height="200"
							></img>
							<div className="flex justify-center gap-1">
								<Image src="/images/medal.png" width="26" height="26" />
								<Image src="/images/medal.png" width="26" height="26" />
								<Image src="/images/medal.png" width="26" height="26" />
							</div>
						</div>

						{/* Player Information */}
						<div className="col-span-3 sm:col-span-2 grid grid-cols-2 gap-y-4 gap-x-8">
							<div className="col-span-1 flex flex-col">
								<h3 className="mb-1 font-light">First Name</h3>
								<div className="py-2 px-3 border rounded-md border-brand-blue-900/25 font-medium">
									{user.find((o) => o.Name === 'name')['Value']}
								</div>
							</div>

							<div className="col-span-1 flex flex-col">
								<h3 className="mb-1 font-light">Last Name</h3>
								<div className="py-2 px-3 border rounded-md border-brand-blue-900/25 font-medium">
									{user.find((o) => o.Name === 'family_name')['Value']}
								</div>
							</div>

							<div className="col-span-1 flex flex-col">
								<h3 className="mb-1 font-light">Location</h3>
								<div className="py-2 px-3 border rounded-md border-brand-blue-900/25 font-medium">
									{user.find((o) => o.Name === 'custom:location')['Value']}
								</div>
							</div>

							<div className="col-span-1 flex flex-col">
								<h3 className="mb-1 font-light">Gender</h3>
								<div className="py-2 px-3 border rounded-md border-brand-blue-900/25 font-medium">
									{user.find((o) => o.Name === 'gender')['Value']}
								</div>
							</div>
						</div>

						{/* Player Teams */}
						<div className="col-span-3 sm:col-span-2 border rounded-md border-brand-blue-900/25">
							<table className="border-collapse table-fixed w-full overflow-hidden rounded-md">
								<thead className="bg-brand-neutral-100 border-b border-brand-blue-900/25">
									<tr className="text-left">
										<th className="py-2 px-3 text-sm font-light w-4/12">
											Sport
										</th>
										<th className="py-2 px-3 text-sm font-light w-4/12">
											Team
										</th>
										<th className="py-2 px-3 text-sm font-light w-4/12">
											Role
										</th>
									</tr>
								</thead>
								<tbody>
									<tr className="font-light">
										<td className="py-2 px-3">Soccer</td>
										<td className="py-2 px-3">Team Name</td>
										<td className="py-2 px-3">Player</td>
									</tr>
								</tbody>
							</table>
						</div>

						{/* Player Game History */}
						<div className="col-span-3">
							<h2 className="mb-1 font-light">Games History</h2>

							<div className="col-span-3 border rounded-md border-brand-blue-900/25">
								<table className="border-collapse table-fixed w-full overflow-hidden rounded-md">
									<thead className="bg-brand-neutral-100 border-b border-brand-blue-900/25">
										<tr className="text-left">
											<th className="py-2 px-3 text-sm font-light w-4/12">
												Games Played
											</th>
											<th className="py-2 px-3 text-sm font-light w-4/12">
												Wins
											</th>
											<th className="py-2 px-3 text-sm font-light w-4/12">
												Losses
											</th>
										</tr>
									</thead>
									<tbody>
										<tr className="font-light">
											<td className="py-2 px-3">0</td>
											<td className="py-2 px-3">0</td>
											<td className="py-2 px-3">0</td>
										</tr>
									</tbody>
								</table>
							</div>
						</div>
					</div>
				</div>
			</main>
		</>
	);
}

export async function getStaticPaths() {
	// Fetch users in AWS Cognito user pool:
	var cognitoidentityserviceprovider = new AWS.CognitoIdentityServiceProvider();
	const resp = async () => {
		try {
			var params = {
				UserPoolId: 'us-east-1_70GCK7G6t' /* required */,
			};
			const data = await cognitoidentityserviceprovider
				.listUsers(params)
				.promise();
			console.log(data.Users);
			return data.Users;
		} catch (err) {
			console.log(err);
			throw err;
		}
	};

	const data = await resp();

	// Use map to extract an array of usernames:
	const paths = data.map((item) => {
		return {
			params: { id: item.Username.toString() },
		};
	});

	// Pass usernames to next function:
	return {
		paths,
		fallback: false,
	};
}

export async function getStaticProps(context) {
	const id = context.params.id;
	console.log(id);

	// Fetch user whose username matches the page's query parameters:
	var cognitoidentityserviceprovider = new AWS.CognitoIdentityServiceProvider();
	const resp = async () => {
		try {
			var params = {
				UserPoolId: 'us-east-1_70GCK7G6t' /* required */,
				Username: id /* required */,
			};
			const data = await cognitoidentityserviceprovider
				.adminGetUser(params)
				.promise();
			console.log(data.UserAttributes);
			return data.UserAttributes;
		} catch (err) {
			console.log(err);
			throw err;
		}
	};

	const data = await resp();

	if (!data) {
		return {
			notFound: true,
		};
	}

	return {
		props: {
			user: data,
		},
	};
}
