import React, { useCallback, useRef } from 'react'
import clsx from 'clsx'
import SearchBar from './SearchBar'

import styles from './index.module.scss'
import { useSearchStore, actions } from '../../Stores/SearchStore'
import { useNavigate } from 'react-router-dom'

const Header = () => {
    let navigate = useNavigate();
    const [state, dispatch] = useSearchStore();
    const refInputSearch = useRef()
    const { searchInput } = state;

    const handleKeyDownEnter = useCallback((event) => {
        if (event.key === 'Enter') {
            if (event.target.value.trim() === '') {
                refInputSearch.current.focus()
                return
            }
            dispatch(actions.setSearch(event.target.value))
            navigate(`/Search/${event.target.value}`)
        }
    }, [dispatch, navigate])

    const handleChange = useCallback((value) => {
        dispatch(actions.setSearchInput(value))
    }, [dispatch])

    const handleClick = useCallback((value) => {
        if (value.trim() === '') {
            refInputSearch.current.focus()
            return
        }
        dispatch(actions.setSearch(value))
        navigate(`/Search/${value}`)
    }, [dispatch, navigate])

    const handleClickLogo = () => {
        dispatch(actions.setSearchInput(""))
        navigate('/')
    }

    return (
        <div className={clsx("text-center py-5 text-uppercase position-relative", styles.header)}>
            <h1 className={clsx(styles.fontHeader)}>
                <span onClick={handleClickLogo}>Photo Gallery</span>
            </h1>
            <h4 className={clsx(styles.fontHeader)}>Simply art. Simply beautiful.</h4>
            <SearchBar refInput={refInputSearch} onChangeSearchInput={handleChange} onClickSearch={handleClick} onKeyDownSearch={handleKeyDownEnter} searchInput={searchInput} />
        </div>
    )
}

export default React.memo(Header)