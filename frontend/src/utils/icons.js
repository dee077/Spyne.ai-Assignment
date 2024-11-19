import {faArrowRight, faArrowLeft, faEdit, faTrash, faSearch} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export const ArrowLeft = () => <FontAwesomeIcon icon={faArrowLeft} />

export const ArrowRight = () => <FontAwesomeIcon icon={faArrowRight} />

export const Edit = () => <FontAwesomeIcon className='mr-1' icon={faEdit} />

export const Delete = () => <FontAwesomeIcon className='mr-1' icon={faTrash} />


export const Search = () => <FontAwesomeIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" icon={faSearch} />

