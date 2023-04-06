/**
 * Last updated: 2023-04-05
 *
 * Author(s):
 * Verity Stevens <stev0298@algonquinlive.com>
 * Ghazaldeep Kaur <kaur0762@algonquinlive.com>
 */

import React, { useEffect, useState } from 'react';
import {
	IconClock,
	IconCalendarEvent,
	IconMapPin,
} from '@tabler/icons-react';
import TeamNameAndImage from '@/components/schedule/TeamNameAndImage';
import { useUser } from '@/context/userContext';

export default function Game({game}) {
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [visible, setVisible] = useState(false);
	const [user, setUser, authRoles] = useUser();

  useEffect(() => {
    dateOfGame();
    if(authRoles.includes('Admin') || authRoles.includes('Owner') || authRoles.includes('Referee')){
      setVisible(true)
    }
    if (game.referees) {
      const refereesUsername = game.referees.map(referee => referee.username)
      
      if (refereesUsername.includes(user.username)){
        setVisible(true)
      }
    }
    }, []);

  const dateOfGame = () => {
    const resp = new Date(game.date);
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];
    var daysOfWeek = ['Sun', 'Mon', 'Tues', 'Wed', 'Thur', 'Fri', 'Sat'];

    //For date of game
    const date = resp.getDate();
    const day = daysOfWeek[resp.getDay()];
    const month = months[resp.getMonth()];
    
    const reqDate = day + ", " + month + " " + date ;
    setDate(reqDate);

    //Reference from https://www.geeksforgeeks.org/how-do-you-display-javascript-datetime-in-12-hour-am-pm-format/
    //For time of game
    let hours = resp.getHours() ;
    
    const AmOrPm = hours >= 12 ? 'PM' : 'AM';
    
    hours = (hours % 12) || 12;
    hours = (hours < 10 ? '0' : '') + hours;

    const minutes = (resp.getMinutes() < 10 ? '0' : '') + resp.getMinutes();
    
    const finalTime = hours + ":" + minutes + " " + AmOrPm; 
    setTime(finalTime);
  }

	return (
		<>
    {visible ? 
			<div className="w-full p-8 flex flex-row justify-between items-center gap-4">
				<div className="min-w-[0px] flex justify-center">
                <img src="/images/soccerball_orange.png" />
				</div>
				<div>
					<div className="font-medium flex flex-row gap-8 items-center">
						<TeamNameAndImage 
              teamName={game.HomeTeam.name}
              src={game.HomeTeam.team_picture}/>
						<span className="border-2 border-brand-orange-800 rounded-xl px-[47px] py-[10px] flex flex-row items-center h-fit gap-1">
							<p>{game.home_score}</p>
							<p>:</p>
							<p>{game.away_score}</p>
						</span>
						<TeamNameAndImage 
              teamName={game.AwayTeam.name}
              src={game.AwayTeam.team_picture}
              reverse={true} />
					</div>
				</div>
				<div className="flex flex-col gap-3 mx-8">
					<div className="flex justify-between gap-3 text-sm">
						<span className="flex items-center gap-1">
							<IconCalendarEvent />{date}
						</span>
						<span className="flex items-center gap-1">
							<IconClock /> {time}
						</span>
					</div>
					<div className="flex gap-1 text-sm">
						<IconMapPin /> Algonquin Dome Field #1
					</div>
				</div>
			</div> 
      :
      <div></div>
      }
		</>
	);
}
