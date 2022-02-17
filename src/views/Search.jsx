import { Container, Box, AppBar, Card, CssBaseline, Toolbar, Typography, Grid, InputBase, IconButton } from "@mui/material";
import { styled, alpha } from '@mui/material/styles';
import SearchIcon from '@mui/icons-material/Search'
import React, { useEffect, useState } from "react";
import { connect } from 'react-redux'
import { requestAction, inputAction } from '../actions/index.js'
import ReactEcharts from 'echarts-for-react';
// import * as echarts from 'echarts';

const SearchBar = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(1),
    marginLeft: 0,
    width: '100%',
    border:'1px solid #8888',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto',
    },
  }));
  
  const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em)`,
      transition: theme.transitions.create('width'),
      width: '100%',
      [theme.breakpoints.up('md')]: {
        width: '80ch',
      },
    },
  }));  

const Search = (props) => {
    const [id,setId] = useState(props.match.params.id);

    useEffect(() => {
        props.requestAction(id);
        if(id!="" && props.State.keyWord===""){
            props.inputChange(id);
        }
    }, [id])

    const toHome = () => {
        props.history.push({
            pathname: '/Home',
        })
    }

    //关键字高亮
    const warpTag = (content, keyword, tagName) => {
        if (content === "") {
            return content;
        }
        const a = content.toLowerCase();
        const b = keyword.toLowerCase();
        const indexof = a.indexOf(b);

        const c = indexof > -1 ? content.substr(indexof, keyword.length) : '';
        const val = `<${tagName} style="font-weight:bold;">${firstCodeToUpper(c)}</${tagName}>`;
        const regS = new RegExp(keyword, 'gi');
        return firstCodeToUpper(content.replace(regS, val));
    }

    //首字母大写
    const firstCodeToUpper = (name) => {
        return name.charAt(0).toUpperCase() + name.slice(1);
    }

    //日期转换
    const dateFormatter = (date) => {
        var m = new Array("Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Spt", "Oct", "Nov", "Dec");
        var dd = date.split('-');
        return m[dd[1] - 1] + ' ' + dd[0]
    }

    //面积图
    const chartMapArea = (search_msv) => {
        var xData = [];
        var data = [];
        search_msv.map(item => {
            xData.push(item.date);
            data.push(item.sv)
        })
        var option = {
            grid: {
                left: -10,
                right: -10,
                top: 0,
                bottom: 10
            },
            xAxis: {
                type: 'category',
                //   boundaryGap: false,
                show: false,
                data: xData
            },
            yAxis: {
                type: 'value',
                show: false
            },
            series: [
                {
                    data: data,
                    type: 'line',
                    smooth: true,
                    symbol: 'none',
                    areaStyle: {}
                }
            ]
        }
        return option;
    }

    const onKeyDownchange = (e) => {
        if (e.keyCode === 13) {
            search() 
        }
    }

    const search = () => {
        props.history.push({
            pathname:'/Search/'+props.State.keyWord,
        })   
        props.requestAction(props.State.keyWord);
        setId(props.State.keyWord)
    }

    const valChange =(e)=>{
        var val = e.target.value;
        val = val.replaceAll(" ", "+");
        props.inputChange(val);
    }
    return (
        <>
            <Box sx={{ flexGrow: 1 }}>
                <AppBar position="static" color="transparent">
                    <Toolbar>
                        <Typography variant="h6" component="div" onClick={toHome} style={{cursor:'pointer'}}>
                            <strong>Best</strong>search
                        </Typography>
                        <SearchBar>
                            <StyledInputBase
                                placeholder="Search for new products in 961K stores"
                                inputProps={{ 'aria-label': 'search' }}
                                onKeyDown={e=>onKeyDownchange(e)}
                                onChange={e=>valChange(e)}
                                defaultValue={id}
                            />
                        </SearchBar>
                        <IconButton aria-label="search" onClick={search}>
                            <SearchIcon  />
                        </IconButton>
                    </Toolbar>
                </AppBar>
            </Box>
            <Container>
                <Box sx={{ my: 2 }}>
                    <Typography variant="h6" component="div">
                     Related product trends
                    </Typography>
                    <Grid container spacing={2}>
                        {props.State.list.map((item, index) => {
                            return (
                                <Grid key={index} item xs={3} sx={{ minWidth: 275 }}>
                                    <Card variant="outlined">
                                        <div style={{ fontSize: '18px', padding: '5px 15px' }} dangerouslySetInnerHTML={{ __html: warpTag(item.name, id, 'span') }}></div>
                                        <div style={{ fontSize: '15px', padding: '0px 15px', color: '#888' }}>Growth {item.growth}%</div>
                                        <div style={{ height: '200px' }}>
                                            <ReactEcharts
                                                className="chart"
                                                id="chartBody"
                                                option={chartMapArea(item.search_msv)}
                                                notMerge={true}
                                                lazyUpdate={true}
                                                style={{ height: '200px', width: '100%' }}
                                            />
                                        </div>
                                        <div style={{ textAlign: 'center', color: '#888',paddingBottom:'5px' }}>{dateFormatter(item.search_msv[0].date)} - {dateFormatter(item.search_msv[item.search_msv.length - 1].date)}</div>
                                    </Card>
                                </Grid>
                            )
                        })}
                    </Grid>
                </Box>
            </Container>

        </>
    )
}

// export default Search;


function mapStateToProps(state) {
    return {
        State: state.State
    }
}
function mapDispatchToProps(dispatch) {
    return {
        inputChange: (e) => dispatch(inputAction(e)),
        requestAction: (e) => dispatch(requestAction(e))
    }
}


let SearchPage = connect(
    mapStateToProps, mapDispatchToProps
)(Search)

export default SearchPage