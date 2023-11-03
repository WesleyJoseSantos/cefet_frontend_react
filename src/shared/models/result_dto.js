export class ResultDTO {
    constructor(obj, httpStatus) {
        if(obj == null) return
        this.fieldCount = obj.fieldCount
        this.affectedRows = obj.affectedRows
        this.insertId = obj.insertId
        this.info = obj.info
        this.serverStatus = obj.serverStatus
        this.warningStatus = obj.warningStatus
        this.changedRows = obj.changedRows
        this.httpStatus = httpStatus
    }
}