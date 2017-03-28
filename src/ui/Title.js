import React, { PropTypes } from 'react'
import styled from 'styled-components'
import colors from './colors'
import { colorize } from './mixins'

const Title = styled.h5`
    font-size: 20px;
    font-weight: 400;
    line-height: 32px;
    color: ${props => props.color ? props.color : colors.aegean};
`

Title.propTypes = {
    color: PropTypes.oneOf(Object.keys(colors))
}

export default Title