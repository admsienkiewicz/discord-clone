import React, { useState } from 'react'
import ChannelList from './ChannelList'
import UserInfo from './UserInfo'
import './Server.scss'
import { MdKeyboardArrowDown } from 'react-icons/md'
import { MdKeyboardArrowUp } from 'react-icons/md'

const Server = () => {
    const [openOptions, setOpenOptions] = useState(false)
    return (
        <div className="Server">
            <div className="Server__info">
                <span className="Server__name">Server</span>
                {!openOptions && (
                    <MdKeyboardArrowDown className="Server__openOptions" onClick={() => setOpenOptions(true)} />
                )}
                {openOptions && (
                    <>
                        <MdKeyboardArrowUp className="Server__closeOptions" onClick={() => setOpenOptions(false)} />
                        <div className="Server__options ">
                            <div className="edit">
                                Edit server
                                <span class="tooltiptext">Only server admin can edit</span>
                            </div>
                            <div className="delete">
                                Delete server
                                <span class="tooltiptext">Only server admin can delete</span>
                            </div>
                        </div>
                    </>
                )}
            </div>
            <div className="Server__details">
                <img
                    src="https://img.olympicchannel.com/images/image/private/t_social_share_thumb/f_auto/primary/qjxgsf7pqdmyqzsptxju"
                    alt=""
                    className="Server__details--logo"
                />
                <span className="Server__details--description">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore
                    etdsadsa dolore magna aliqua. Pellentesque elit eget gravida cum.
                </span>
                <span className="Server__details--admin">
                    <b>Server Admin:</b> Username
                </span>
            </div>
            <ChannelList />
            <UserInfo />
        </div>
    )
}

export default Server
