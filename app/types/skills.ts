export interface SkillType {
	id: string;
	name: string;
	top: string;
	left: string;
	width: string;
	height: string;
	animation?: 'xl:animate-float-1' | 'xl:animate-float-2' | 'xl:animate-float-3' | 'xl:animate-float-4' | 'xl:animate-float-5' | 'xl:animate-float-6';
	glow: 'glow-lg' | 'glow-md' | 'glow-sm';
	delay: number;
}