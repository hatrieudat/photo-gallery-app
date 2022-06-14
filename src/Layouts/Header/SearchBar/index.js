import clsx from 'clsx'
import React, { memo } from 'react'
import { FormControl, InputGroup } from 'react-bootstrap'

const SearchBar = ({ onChangeSearchInput, searchInput, onClickSearch, refInput, onKeyDownSearch }) => {
    return (
        <InputGroup size="lg" className='mx-auto w-50 position-absolute top-100 start-50 translate-middle rounded bg-white shadow'>
            <FormControl
                ref={refInput}
                placeholder='Search...'
                aria-label='Search photo'
                className='shadow-none border-0 fs-6'
                value={searchInput}
                onChange={e => onChangeSearchInput(e.target.value)}
                onKeyDown={e => onKeyDownSearch(e)}
            />
            <button className={clsx('shadow-none btn my-0 py-0 fade', {
                show: searchInput ? true : false
            })} disabled={ searchInput ? false : true }
                onClick={() => onChangeSearchInput('')}
            >
                <i className="bi bi-x"></i>
            </button>
            <button className='btn btn-warning shadow-none' onClick={() => onClickSearch(searchInput)}>
                <i className="bi bi-search"></i>
            </button>
        </InputGroup>
    )
}

export default memo(SearchBar)