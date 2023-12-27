import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Close';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import {
    GridRowModes,
    DataGrid,
    GridToolbarContainer,
    GridActionsCellItem,
    GridRowEditStopReasons,
} from '@mui/x-data-grid';
import AdminService from '../../services/admins'



function EditToolbar(props) {
    const { setRows, setRowModesModel , getmaxId} = props;

    const handleClick = () => {
        const id = getmaxId() + 1;
        console.log("CREATE id" , id);
        setRows((oldRows) => [...oldRows, { id, name: '',  isNew: true }]);
        setRowModesModel((oldModel) => ({
            ...oldModel,
            [id]: { mode: GridRowModes.Edit, fieldToFocus: 'name' },
        }));
    };

    return (
        <GridToolbarContainer>
            <Button color="primary" startIcon={<AddIcon />} onClick={handleClick}>
                添加药品
            </Button>
        </GridToolbarContainer>
    );
}

export default function PatientPage({ data }) {
    const [rows, setRows] = React.useState(data);
    const [rowModesModel, setRowModesModel] = React.useState({});
    const [maxId, setMaxId] = React.useState(0)

    function findMaxPropertyValue(array) {
        return array.reduce((maxValue, currentObject) => Math.max(maxValue, currentObject.id), 0);
    }

    const getmaxId = () =>{
        return maxId
    }


    React.useEffect(() => {
        setMaxId(findMaxPropertyValue(data))
    }, []);

    console.log("maxId", );



    const handleRowEditStop = (params, event) => {
        if (params.reason === GridRowEditStopReasons.rowFocusOut) {
            event.defaultMuiPrevented = true;
        }
    };

    const handleEditClick = (id) => () => {
        setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
    };

    const handleSaveClick = (id) => () => {
        console.log("SAVE");
        setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });

    };

    const handleDeleteClick = (id) => () => {
        console.log("DELETE");
        AdminService.deletePatient(id)
        setRows(rows.filter((row) => row.id !== id));
    };

    const handleCancelClick = (id) => () => {
        setRowModesModel({
            ...rowModesModel,
            [id]: { mode: GridRowModes.View, ignoreModifications: true },
        });

        const editedRow = rows.find((row) => row.id === id);
        if (editedRow.isNew) {
            setRows(rows.filter((row) => row.id !== id));
        }
    };

    const processRowUpdate = (newRow) => {

        if (newRow.id > maxId) {
            console.log("CREATE");
            AdminService.createPatient(newRow)
            setMaxId(newRow.id)
        } else {
            console.log("UPDATE");
            AdminService.updatePatient(newRow.id, newRow)
            const updatedRow = { ...newRow, isNew: false };
            setRows(rows.map((row) => (row.id === newRow.id ? updatedRow : row)));
            return updatedRow;
        }
    };

    const handleRowModesModelChange = (newRowModesModel) => {
        setRowModesModel(newRowModesModel);
    };

    const columns = [
        { field: 'id', headerName: '编号', width: 80, editable: false },
        {
            field: 'name',
            headerName: '药品名称',
            width: 80,
            editable: true,
        },
        {
            field: 'manufacturer',
            headerName: '生存厂商',
            width: 180,
            editable: true,
        },
        {
            field: 'dosage',
            headerName: '剂量',
            width: 80,
            editable: true,
        },
        {
            field: 'balance',
            headerName: '账户余额',
            width: 100,
            editable: true,
            type: 'number',
        },
        {
            field: 'inventory',
            headerName: '库存量',
            width: 100,
            editable: true,
        },
        {
            field: 'actions',
            type: 'actions',
            headerName: '操作',
            width: 100,
            cellClassName: 'actions',
            getActions: ({ id }) => {
                const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;

                if (isInEditMode) {
                    return [
                        <GridActionsCellItem
                            icon={<SaveIcon />}
                            label="Save"
                            sx={{
                                color: 'primary.main',
                            }}
                            onClick={handleSaveClick(id)}
                        />,
                        <GridActionsCellItem
                            icon={<CancelIcon />}
                            label="Cancel"
                            className="textPrimary"
                            onClick={handleCancelClick(id)}
                            color="inherit"
                        />,
                    ];
                }

                return [
                    <GridActionsCellItem
                        icon={<EditIcon />}
                        label="Edit"
                        className="textPrimary"
                        onClick={handleEditClick(id)}
                        color="inherit"
                    />,
                    <GridActionsCellItem
                        icon={<DeleteIcon />}
                        label="Delete"
                        onClick={handleDeleteClick(id)}
                        color="inherit"
                    />,
                ];
            },
        },
    ];

    return (
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Grid item xs={12}>
                <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                    <Box
                        sx={{
                            height: 500,
                            width: '100%',
                            '& .actions': {
                                color: 'text.secondary',
                            },
                            '& .textPrimary': {
                                color: 'text.primary',
                            },
                        }}
                    >
                        <DataGrid
                            rows={rows}
                            columns={columns}
                            editMode="row"
                            rowModesModel={rowModesModel}
                            onRowModesModelChange={handleRowModesModelChange}
                            onRowEditStop={handleRowEditStop}
                            processRowUpdate={processRowUpdate}
                            slots={{
                                toolbar: EditToolbar,
                            }}
                            slotProps={{
                                toolbar: { setRows, setRowModesModel , getmaxId},
                            }}
                        />
                    </Box>
                    {/* <PatientInfo/>  */}
                    {/* <Orders /> */}
                </Paper>
            </Grid>
        </Container>
    );
}