import { Dialog, DialogTitle, DialogContent, Card, CardActionArea, Grid, Typography, TableContainer, TableBody, TableCell, TableHead, TableRow, List, ListItem, Button, DialogActions } from "@material-ui/core"
import React from "react"
import { useState } from "react"
import { LoadingScreen } from "src/components/layout"
import { useGetMenuQuery } from "../api"
import { menu_menu_courses } from "../types/menu"
import { UpdateMenuDialog } from "./UpdateMenu"

export const MenuDialog = ({
    setId,
    id,
    open,
    onClose,
}: {
    setId: () => void;
    id: string;
    open: boolean;
    onClose: () => void
}) => {

    const { data, loading, error } = useGetMenuQuery(id)
    const [updateOpen, setUpdateOpen] = useState(false)

    if (loading) return <LoadingScreen/>
    if (error) return <LoadingScreen/>

    let menu = data.menu

    return (
        <>
        <Dialog open={open} onClose={onClose}>
            {menu && (
             <>
                <DialogTitle style={{ fontWeight: 600 }} id="form-dialog-title">Menu: {menu.name}</DialogTitle>
                <DialogActions>
                <Button variant="contained" onClick={onClose}>
                  Terug
                </Button>
                <Button variant="contained" onClick={() => {
                    setId();
                    setUpdateOpen(true);
                }}>
                  Menu aanpassen
                </Button>
              </DialogActions>
              <DialogContent>
                  <Card>
                      <Grid container spacing={2} xs={12}>
                       <ItemString 
                       title="seizoen"
                       item={menu.season}
                       />
                       <ItemString 
                       title="thema"
                       item={menu.theme}
                       />
                       <ItemInt 
                       title="rating"
                       item={menu.rating}
                       />
                      <ItemPeriod 
                      title="periode"
                      startdate={menu.periodstartdate}
                      enddate={menu.periodenddate}
                      />
                      <ItemCourses2
                      title="Gangen"
                      item={menu.courses}
                      />
                      </Grid>
                  </Card>
              </DialogContent>
            </>
            )}
            <UpdateMenuDialog
        id={menu.id}
        open={updateOpen}
        onClose={() => setUpdateOpen(false)}
        />
        </Dialog>
        
        </>
    )
}

export const ItemCourses2 = ({title, item}: {title: string, item: menu_menu_courses []| null;}) => {
    return (
        <>
        <Grid key={0} item xs={12}>
        <Typography style={{ fontWeight: 600 }}>{title}</Typography>
        </Grid> 
                    {item && item.map((course) => (
                <Grid item xs={12}>
                    <Typography style={{ fontWeight: 600 }} align="center">{course.course.courseType}</Typography>
                            {course.dishes.map((dish) => (
                                <>
                                <Typography align="center">- {dish.name}</Typography>
                                </>
                            ))}
                            </Grid>
                    ))}
            </>
    )
}

export const ItemString = ({title, item}: {title: string, item: string | null}) => {
    return (
        <>
        <Grid key={0} item xs={3}>
        <Typography style={{ fontWeight: 600 }}>{title}</Typography>
        </Grid>  
        <Grid key={1} item xs={9}>
        {item? item : "Geen "+ title + "bekend"}
        </Grid> 
        </> 
    )
}

export const ItemDouble = ({title, item}: {title: string, item: number | null}) => {
    return (
        <>
        <Grid key={0} item xs={3}>
        <Typography style={{ fontWeight: 600 }}>{title}</Typography>
        </Grid>  
        <Grid key={1} item xs={9}>
        {item? item : "Geen "+ title + "bekend"}
        </Grid> 
        </> 
    )
}

export const ItemInt = ({title, item}: {title: string, item: number | null}) => {
    return (
        <>
        <Grid key={0} item xs={3}>
        <Typography style={{ fontWeight: 600 }}>{title}</Typography>
        </Grid>  
        <Grid key={1} item xs={9}>
        {item}
        </Grid> 
        </> 
    )
}

export const ItemPeriod = ({title, startdate, enddate}: {title: string, startdate: string | null, enddate: string | null}) => {
    return (
        <>
        <Grid key={0} item xs={3}>
        <Typography style={{ fontWeight: 600 }}>{title}</Typography>
        </Grid>  
        <Grid key={1} item xs={9}>
        Vanaf {startdate? startdate : "Geen "+ startdate + "bekend"} tot {enddate? enddate : "Geen "+ enddate + "bekend"}
        </Grid> 
        </> 
    )
}