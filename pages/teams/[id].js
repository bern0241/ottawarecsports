import React from 'react';
import { useRouter } from 'next/router';
import { Button } from 'flowbite-react';
import { IconChevronLeft } from '@tabler/icons-react';
import Image from 'next/image';

export default function TeamProfile() {
	const router = useRouter();
	const teamId = router.query.id;

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
							<h3 className="mb-1 font-light">Team Name</h3>
							<div className="py-2 px-3 border rounded-md border-brand-blue-900/25 font-medium">
								The A-Team
							</div>
						</div>

						<div className="col-span-1 flex flex-col">
							<h3 className="mb-1 font-light">Team Captain</h3>
							<div className="py-2 px-3 border rounded-md border-brand-blue-900/25 font-medium">
								John Doe
							</div>
						</div>

						<div className="col-span-1 flex flex-col">
							<h3 className="mb-1 font-light">Sport</h3>
							<div className="py-2 px-3 border rounded-md border-brand-blue-900/25 font-medium">
								Volleyball
							</div>
						</div>

						<div className="col-span-1 flex flex-col">
							<h3 className="mb-1 font-light">Max Members</h3>
							<div className="py-2 px-3 border rounded-md border-brand-blue-900/25 font-medium">
								15
							</div>
						</div>

						<div className="col-span-1 flex flex-col">
							<h3 className="mb-1 font-light">Team Colours</h3>
							<div className="flex gap-8 py-2 px-3 border rounded-md border-brand-blue-900/25 font-medium">
								{/* Home Colour */}
								<div className="flex items-center gap-2">
									<div className="w-4 h-4 bg-red-500 rounded-sm border border-black"></div>{' '}
									Red
								</div>
								{/* Away Colour */}
								<div className="flex items-center gap-2">
									<div className="w-4 h-4 bg-white rounded-sm border border-black"></div>{' '}
									White
								</div>
							</div>
						</div>

						<div className="col-span-1 flex flex-col">
							<h3 className="mb-1 font-light">Who Can Join?</h3>
							<div className="flex gap-4 py-2 px-3 font-medium">
								{/* Men Checkbox */}
								<div class="flex items-center">
									<input
										id="men-checkbox"
										type="checkbox"
										value=""
										class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
										disabled
									/>
									<label
										for="men-checkbox"
										class="ml-2 text-gray-900 dark:text-gray-300"
									>
										Men
									</label>
								</div>

								{/* Women Checkbox */}
								<div class="flex items-center">
									<input
										id="women-checkbox"
										type="checkbox"
										value=""
										class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
										disabled
									/>
									<label
										for="women-checkbox"
										class="ml-2 text-gray-900 dark:text-gray-300"
									>
										Women
									</label>
								</div>
								{/* Anyone Checkbox */}
								<div class="flex items-center">
									<input
										id="all-checkbox"
										type="checkbox"
										value=""
										class="w-4 h-4 text-brand-blue-800 bg-gray-100 border-gray-300 rounded"
										checked
									/>
									<label
										for="all-checkbox"
										class="ml-2 text-gray-900"
									>
										Anyone
									</label>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</main>
	);
}
