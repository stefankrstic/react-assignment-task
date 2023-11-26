import { DataGrid } from "@mui/x-data-grid";
import { useState } from "react";

export function BaseDataGrid(props) {
    const [paginationModel, setPaginationModel] = useState({ pageSize: 10, page: 0 });

    return (
        <DataGrid
            paginationModel={paginationModel}
            pageSizeOptions={[10]}
            onPaginationModelChange={(state) => setPaginationModel(state)}
            {...props}
        />
    );
}
