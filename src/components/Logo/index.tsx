import { Box, Hidden, Tooltip } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { experimentalStyled } from '@material-ui/core/styles';


const LogoWrapper = experimentalStyled(Link)(
  ({ theme }) => `
        color: ${theme.palette.text.primary};
        padding: ${theme.spacing(0, 1, 0, 0)};
        display: flex;
        text-decoration: none;
        font-weight: ${theme.typography.fontWeightBold};
`
);

const LogoSignWrapper = experimentalStyled(Box)(
  () => `
        width: 52px;
        height: 38px;
        margin-top: 4px;
        transform: scale(.8);
`
);

const LogoSign = experimentalStyled(Box)(
  ({ theme }) => `
        background: ${theme.general.reactFrameworkColor};
        width: 18px;
        height: 18px;
        border-radius: ${theme.general.borderRadiusSm};
        position: relative;
        transform: rotate(45deg);
        top: 3px;
        left: 17px;

        &:after, 
        &:before {
            content: "";
            display: block;
            width: 18px;
            height: 18px;
            position: absolute;
            top: -1px;
            right: -20px;
            transform: rotate(0deg);
            border-radius: ${theme.general.borderRadiusSm};
        }

        &:before {
            background: ${theme.palette.primary.main};
            right: auto;
            left: 0;
            top: 20px;
        }

        &:after {
            background: ${theme.palette.secondary.main};
        }
`
);

const LogoSignInner = experimentalStyled(Box)(
  ({ theme }) => `
        width: 16px;
        height: 16px;
        position: absolute;
        top: 12px;
        left: 12px;
        z-index: 5;
        border-radius: ${theme.general.borderRadiusSm};
        background: ${theme.header.background};
`
);

const LogoTextWrapper = experimentalStyled(Box)(
  ({ theme }) => `
        padding-left: ${theme.spacing(1)};
`
);

const VersionBadge = experimentalStyled(Box)(
  ({ theme }) => `
        background: ${theme.palette.success.main};
        color: ${theme.palette.success.contrastText};
        padding: ${theme.spacing(0.4, 1)};
        border-radius: ${theme.general.borderRadiusSm};
        text-align: center;
        display: inline-block;
        line-height: 1;
        font-size: ${theme.typography.pxToRem(11)};
`
);

const LogoText = experimentalStyled(Box)(
  ({ theme }) => `
        font-size: ${theme.typography.pxToRem(15)};
        font-weight: ${theme.typography.fontWeightBold};
`
);

function Logo() {


  return (
    <LogoWrapper to="/overview">
      <LogoSignWrapper>
        <LogoSign>
          <LogoSignInner />
        </LogoSign>
      </LogoSignWrapper>
      <Hidden smDown>
        <LogoTextWrapper>
          <Tooltip title="Version 1.0" arrow placement="right">
            <VersionBadge>1.0</VersionBadge>
          </Tooltip>
          <LogoText>My Chefsbase</LogoText>
        </LogoTextWrapper>
      </Hidden>
    </LogoWrapper>
  );
}

export default Logo;
