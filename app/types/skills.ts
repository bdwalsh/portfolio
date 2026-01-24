export interface SkillType {
    id: string;
    name: string;
    top: string;
    left: string;
    width: string;
    height: string;
    animation?: 'xl:animate-float-1' | 'xl:animate-float-2' | 'xl:animate-float-3';
}