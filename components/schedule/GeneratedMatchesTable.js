import { useState, useEffect } from 'react';
import DropdownInput from '../common/DropdownInput';
import MatchRow from './MatchRow';
import { useRouter } from 'next/router';
import { API } from 'aws-amplify';
import { getLeague } from '@/src/graphql/queries';
import { getSeasonShort, getDivisionShort } from '@/src/graphql/custom-queries';

const GeneratedMatchesTable = ({
	matches,
	setMatchToEdit,
	setIsEditing,
	setIsDeleting,
	selectedDate,
	setSelectedDate,
	isCoordinator,
}) => {
	const router = useRouter();

	return <></>;
};

export default GeneratedMatchesTable;
