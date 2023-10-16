export interface CourseType {
    id: string,
    name: string,
}


export const CourseTypeList: CourseType[] = [
    { id: '1', name: 'Pogramacion' },
    { id: '2', name: 'Diseño' },
    { id: '3', name: 'Matematicas' },
    { id: '4', name: 'Fisica' },
    { id: '5', name: 'Quimica' },
    { id: '6', name: 'Ingles' },
    { id: '7', name: 'Ingenieria' },
    { id: '8', name: 'Arquitectura' },
    { id: '9', name: 'Derecho' },
    { id: '10', name: 'Medicina'},
    { id: '11', name: 'Enfermeria' },
].sort((a, b) => a.name.localeCompare(b.name));
