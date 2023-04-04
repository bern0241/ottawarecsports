import React,{useState, useEffect} from 'react';
import {API} from 'aws-amplify';
import DropdownInput from '../common/DropdownInput';
import { useRouter } from 'next/router';
import makeid from '@/utils/makeId';
import { createGame } from '@/src/graphql/mutations';
import TeamDropDown from './TeamDropDown';
import TeamCardSelected from './TeamCardSelected';
import RefereeSearchBar from './RefereeSearchBar';
import RefereeChip from './RefereeChip';
import AWS from 'aws-sdk'
import DatePicker from 'tailwind-datepicker-react';

const EditMatchModal = () => {

  return (
    <div>EditMatchModal
    </div>
  )
}

export default EditMatchModal;